from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile
from .validators import handle_password_validation, validate_email_address
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    UserLoginSerializer,
    UserRegistrationSerializer,
    ProfileAvatarSerializer
)


class UserLogoutAPIView(APIView):
    """
    API endpoint to log out the users
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):
    """
    API endpoint for User login, only POST method is allowed
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = RefreshToken.for_user(user)
            data = serializer.data
            data["tokens"] = {
                "refresh": str(token),
                "access": str(token.access_token)
            }
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegistrationAPIView(APIView):
    """
    API endpoint to register a user
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email_address = request.data.get("email")
        if not validate_email_address(email_address):
            return Response({"error": "Email is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        password = request.data.get("password")
        password_error = handle_password_validation(password=password)
        if password_error:
            return Response({"error": password_error}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            data = serializer.data
            data["tokens"] = {
                "refresh": str(token),
                "access": str(token.access_token)
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(RetrieveAPIView):
    """
    Get and Update User information
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserProfileAPIView(RetrieveAPIView):
    """
    GET nad UPDATE user profile
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_object(self):
        return self.request.user.profile


class UserAvatarAPIView(RetrieveAPIView):
    """
    GET and DELETE user avatar
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileAvatarSerializer
    queryset = Profile.objects.all()

    def get_object(self):
        return self.request.user.profile
