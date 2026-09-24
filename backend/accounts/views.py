from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import LoginSerializer,RegisterSerializer
from .models import User
from .serializers import UserInfoSerializer,PublicProfileSerializer
from rest_framework.permissions import IsAuthenticated


class LoginView(APIView):

    def post(self,request):
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():
            user = authenticate(**serializer.validated_data)
            if user:
                token,created = Token.objects.get_or_create(user = user)
                user = User.objects.get(id = user.id)
                userSerializer = UserInfoSerializer(user)
                return Response({"token":token.key,"userprofile":userSerializer.data})
            else:
                return Response({"error":"Invalid credintials"},status = 400)
        return Response({"error":"Invalid credintials"},status = 400)
            

class RegisterView(APIView):
    def post(self,request):
        serializer = RegisterSerializer(data = request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
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

        if len(new_password) < 8:
            return Response(
                {"detail": "New password must be at least 8 characters long."},
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
