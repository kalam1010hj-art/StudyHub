from rest_framework import serializers

from .models import User
from academics.serializers import MyResourceSerializer

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 200)
    password = serializers.CharField(max_length = 200)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name","last_name","email","username","id","password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'date_joined',

            'role',
            'is_verified_student',
            'bio',
            'avatar',
            'phone_number',
            'college_name',
            'branch_or_major',
            'academic_year',
            'graduation_year',
            'reputation_points',
            'github_url',
            'linkedin_url',
            'website_url',
        ]

        read_only_fields = [
            'id',
            'username',
            'email',
            'role',
            'is_verified_student',
            'reputation_points',
            'date_joined',
        ]
class PublicProfileSerializer(serializers.ModelSerializer):
    resources = MyResourceSerializer(source="uploaded_resources", many=True, read_only=True)

    class Meta:
        model = User
        fields = [
                    'id',
                    'username',
                    'email',
                    'first_name',
                    'last_name',
                    'date_joined',
                    'role',
                    'bio',
                    'avatar',
                    'college_name',
                    'branch_or_major',
                    'academic_year',
                    'graduation_year',
                    'reputation_points',
                    'github_url',
                    'linkedin_url',
                    'website_url',
                    'resources',
                    ]


class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        pass