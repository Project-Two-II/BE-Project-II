from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from .models import User, Profile
from .backends import EmailBackend
from .validators import CustomPasswordValidator


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer class to serialize Login fields, and authenticate user
    """
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        # print(attrs)
        email_backend = EmailBackend()
        user = email_backend.authenticate(email=attrs["email"], password=attrs["password"])
        # print(user)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials.")


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer class for user registration fields, register user
    """
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "username", "role", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(
            email=validated_data["email"],
            username=validated_data["username"],
            role=validated_data.get("role", 0)
        )
        password_validator = CustomPasswordValidator()
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer class to serialize User model.
    """
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "username", "role")


class ProfileAvatarSerializer(serializers.ModelSerializer):
    """
    Serializer class to serialize avatar of user
    """
    class Meta:
        model = Profile
        fields = ("avatar",)


class ProfileSerializer(UserSerializer):
    """
    Serializer class to serialize Profile model
    Avatar and user lies under profile
    """
    user = UserSerializer(many=False)
    avatar = ProfileAvatarSerializer(many=False)

    class Meta:
        model = Profile
        fields = ("bio",)
