from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    UserLoginSerializer,
    UserRegistrationSerializer
)


class UserLogoutAPIView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):
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
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
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


class ProfileAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user_serializer = UserSerializer(user=request.user)
        profile_serializer = ProfileSerializer(request.user.profile)
        data = {
            "user": user_serializer.data,
            "profile": profile_serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)
