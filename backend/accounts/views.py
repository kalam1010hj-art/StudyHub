from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .serializers import LoginSerializer,RegisterSerializer
from .models import User
from .serializers import UserInfoSerializer,PublicProfileSerializer
from rest_framework.permissions import IsAuthenticated


class LoginView(APIView):

    def post(self,request):
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():
            identifier = serializer.validated_data["identifier"].strip()
            password = serializer.validated_data["password"]

            username = identifier
            if "@" in identifier:
                account = User.objects.filter(email__iexact=identifier, is_active=True).first()
                if account:
                    username = account.username

            user = authenticate(username=username, password=password)
            if user:
                token,created = Token.objects.get_or_create(user = user)
                user = User.objects.get(id = user.id)
                userSerializer = UserInfoSerializer(user)
                return Response({"token":token.key,"userprofile":userSerializer.data})
            else:
                return Response({"error":"Invalid username/email or password."},status = 400)
        return Response({"error":"Invalid username/email or password."},status = 400)
            

class RegisterView(APIView):
    def post(self,request):
        serializer = RegisterSerializer(data = request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "message": "Account created successfully.",
            }, status=201)
        return Response({"error":serializer.errors},status=400)

#  This view is used to provide user information for profile page
class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
         try:
             
            user = User.objects.get(id = request.user.id)
            serializer = UserInfoSerializer(user)
            return Response(serializer.data)
         except User.DoesNotExist:
             return Response({"error":"User doesn't exist"},status=404)
    def patch(self,request):
        try:
            user = User.objects.get(id = request.user.id)
            serilaizer = UserInfoSerializer(user,data = request.data,partial = True)
            print(request.data)
            if serilaizer.is_valid():
                serilaizer.save()
                return Response(serilaizer.data)
            return Response({"errors":serilaizer.errors}, status=400)
           
        except User.DoesNotExist:
            return Response({'error':"user does not exist"},status=404)
    

class PublicProfileView(APIView):

    def get(self,request):
        try:
            userId = request.query_params.get("userId")
            user = User.objects.get(id = userId)
            serializer = PublicProfileSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error":"User doesn't exist"},status=404)
    

        




class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not current_password or not new_password or not confirm_password:
            return Response(
                {"detail": "Current password, new password, and confirmation are required."},
                status=400,
            )

        if not request.user.check_password(current_password):
            return Response(
                {"detail": "Current password is incorrect."},
                status=400,
            )

        try:
            validate_password(new_password, user=request.user)
        except ValidationError as exc:
            return Response(
                {"detail": " ".join(exc.messages)},
                status=400,
            )

        if new_password != confirm_password:
            return Response(
                {"detail": "New password and confirmation do not match."},
                status=400,
            )

        if current_password == new_password:
            return Response(
                {"detail": "New password must be different from the current password."},
                status=400,
            )

        request.user.set_password(new_password)
        request.user.save(update_fields=["password", "updated_at"])

        return Response({"detail": "Password changed successfully."})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response({"detail": "Logged out successfully."})


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        password = request.data.get("password")

        if not password:
            return Response(
                {"detail": "Password is required to delete your account."},
                status=400,
            )

        if not request.user.check_password(password):
            return Response(
                {"detail": "Password is incorrect."},
                status=400,
            )

        user = request.user
        Token.objects.filter(user=user).delete()
        user.delete()

        return Response(status=204)


class ForgotPasswordView(APIView):
    """
    Send a password-reset link to the email address associated with an account.

    The response is intentionally generic so callers cannot use this endpoint
    to discover whether an email address is registered.
    """

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        from django.conf import settings
        from django.contrib.auth.tokens import default_token_generator
        from django.core.mail import send_mail
        from django.urls import reverse
        from django.utils.http import urlsafe_base64_encode
        from django.utils.encoding import force_bytes

        email = (request.data.get("email") or "").strip().lower()

        if not email:
            return Response({"detail": "Please enter your email address."}, status=400)

        users = User.objects.filter(email__iexact=email, is_active=True)

        for user in users:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_url = (
                f"{settings.FRONTEND_URL.rstrip('/')}/reset-password/{uid}/{token}"
            )

            send_mail(
                subject="Reset your StudyHub password",
                message=(
                    f"Hi {user.first_name or user.username},\\n\\n"
                    "We received a request to reset your StudyHub password. "
                    "Use the link below to choose a new password:\\n\\n"
                    f"{reset_url}\\n\\n"
                    "This link is valid for a limited time and becomes invalid "
                    "after your password is changed. If you did not request this, "
                    "you can safely ignore this email.\\n\\n"
                    "StudyHub"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

        return Response(
            {"detail": "If an account exists for that email, a reset link has been sent."},
            status=200,
        )


class ResetPasswordView(APIView):
    """
    Validate a password-reset token and set a new password.
    """

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        from django.contrib.auth.tokens import default_token_generator
        from django.core.exceptions import ValidationError
        from django.utils.encoding import force_str
        from django.utils.http import urlsafe_base64_decode

        uid = request.data.get("uid")
        token = request.data.get("token")
        new_password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        if not uid or not token or not new_password or not confirm_password:
            return Response(
                {"detail": "All fields are required."},
                status=400,
            )

        if new_password != confirm_password:
            return Response(
                {"detail": "Passwords do not match."},
                status=400,
            )

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id, is_active=True)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"detail": "This password reset link is invalid or expired."},
                status=400,
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"detail": "This password reset link is invalid or expired."},
                status=400,
            )

        try:
            validate_password(new_password, user=user)
        except ValidationError as exc:
            return Response(
                {"detail": " ".join(exc.messages)},
                status=400,
            )

        user.set_password(new_password)
        user.save(update_fields=["password", "updated_at"])

        # Existing DRF tokens remain valid only until the user logs out.
        # Remove them here so a password reset invalidates existing sessions.
        Token.objects.filter(user=user).delete()

        return Response({"detail": "Password reset successfully."}, status=200)
