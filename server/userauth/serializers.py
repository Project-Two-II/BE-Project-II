from rest_framework import serializers

from .models import User, Profile
from .backends import EmailBackend


class ChangePasswordSerializer(serializers.Serializer):
    """
    The serializer to change password.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, write_only=True)


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer class to serialize Login fields, and authenticate user
    """
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email_backend = EmailBackend()
        user = email_backend.authenticate(request=None, username=attrs["email"], password=attrs["password"])

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
        return User.objects.create_user(**validated_data)


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
