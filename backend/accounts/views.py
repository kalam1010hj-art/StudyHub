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
            return Response({"errors":serilaizer.errors})
           
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
    

        


