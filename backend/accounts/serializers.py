from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from .models import User
from academics.serializers import MyResourceSerializer

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(max_length=254)
    password = serializers.CharField(max_length=200)

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, allow_blank=False)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "username", "id", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "first_name": {"required": True, "allow_blank": False},
            "last_name": {"required": True, "allow_blank": False},
            "username": {"required": True, "allow_blank": False},
        }

    def validate_username(self, value):
        value = value.strip()
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("That username is already taken.")
        return value

    def validate_email(self, value):
        value = value.strip().lower()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

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
            'is_staff',
        ]

        read_only_fields = [
            'id',
            'username',
            'email',
            'role',
            'is_verified_student',
            'reputation_points',
            'date_joined',
            'is_staff',
        ]
class PublicProfileSerializer(serializers.ModelSerializer):
    resources = MyResourceSerializer(source="uploaded_resources", many=True, read_only=True)

    class Meta:
        model = User
        fields = [
                    'id',
                    'username',
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