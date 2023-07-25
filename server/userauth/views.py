import jwt
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import smart_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from ELabX import settings

from .models import Profile, User
from .utils import Util
from .permissions import IsVerified
from .validators import handle_password_validation, validate_email_address, handle_user_error
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    UserLoginSerializer,
    UserRegistrationSerializer,
    ProfileAvatarSerializer,
    ChangePasswordSerializer,
    EmailVerificationSerializer,
    RequestPasswordResetEmailSerializer,
    SetNewPasswordSerializer,
)


class SetNewPasswordAPIView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"detail": "Password reset success"}, status=status.HTTP_200_OK)


class PasswordResetTokenCheckAPIView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({"detail": "Token is not valid, please request a new one"},
                                status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": "Token is not valid, please request a new one", "uidb64": uidb64, "token": token},
                            status=status.HTTP_400_BAD_REQUEST)

        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return Response({'error': 'Token is not valid, please request a new one'},
                                status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmailAPIView(GenericAPIView):
    serializer_class = RequestPasswordResetEmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get("email", '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relative_link = reverse(
                "password-reset-confirm", kwargs={'uidb64': uidb64, 'token': token})

            abs_url = "http://" + current_site + relative_link
            email_body = "Hello, \n Use link below to reset your password \n" + abs_url
            data = {"email_body": email_body, "to_email": user.email,
                    "email_subject": "Reset your password"}
            Util.send_mail(data)
            return Response(
                {"detail": "We have sent you a link to reset your password"},
                status=status.HTTP_200_OK
            )
        return Response(
            {"detail": "User with given email does not exists."},
            status=status.HTTP_400_BAD_REQUEST
        )


class ChangePasswordAPIView(APIView):
    """
    API endpoint to change password
    """
    permission_classes = (IsAuthenticated, IsVerified)

    def put(self, request, *args, **kwargs):
        user = self.request.user
        payload = request.data.copy()
        new_password = payload.get("new_password")
        password_error = handle_password_validation(password=new_password)
        if password_error:
            return Response({"detail": password_error}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ChangePasswordSerializer(data=payload)
        if serializer.is_valid():
            if not user.check_password(serializer.data.get("old_password")):
                return Response({
                    "detail": "Wrong password."
                }, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get("new_password"))
            user.save()
            return Response({
                "detail": "Password updated successfully."
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutAPIView(APIView):
    """
    API endpoint to log out the users
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated, IsVerified)

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
            if not user.is_verified:
                return Response({"detail": "Please verify your account."}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken.for_user(user)
            data = serializer.data
            data["tokens"] = {
                "refresh": str(token),
                "access": str(token.access_token)
            }
            return Response(data, status=status.HTTP_200_OK)
        if "non_field_errors" in dict(serializer.errors):
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailAPIView(APIView):
    def get(self, request):
        token = request.GET.get("token")
        serializer = EmailVerificationSerializer(data=token)
        if serializer.is_valid():
            try:
                payload = jwt.decode(token, settings.SECRET_KEY)
                user = User.objects.get(id=payload["user_id"])
                if not user.is_verified:
                    user.is_verified = True
                    user.save()
                return Response(
                    {"detail": "Account is successfully activated."},
                    status=status.HTTP_200_OK
                )
            except jwt.ExpiredSignatureError:
                return Response(
                    {"detail": "Activation link is expired."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            except jwt.exceptions.DecodeError:
                return Response(
                    {"detail": "Invalid token."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(
            {"detail": "Something went wrong", "serializer": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class UserRegistrationAPIView(APIView):
    """
    API endpoint to register a user
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email_address = request.data.get("email")
        if not validate_email_address(email_address):
            return Response({"detail": "Email is not valid."}, status=status.HTTP_400_BAD_REQUEST)
        password = request.data.get("password")
        password_error = handle_password_validation(password=password)
        if password_error:
            return Response({"detail": password_error}, status=status.HTTP_400_BAD_REQUEST)
        username = request.data.get("username")
        user_error = handle_user_error(email_address, username)
        if user_error:
            return Response({"detail": user_error}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            access_token = RefreshToken.for_user(user).access_token
            data = serializer.data

            # Send access token to user's email
            current_site = get_current_site(request).domain
            relative_link = reverse("userauth:verify-email")

            abs_url = "http://" + current_site + relative_link + "?token=" + str(access_token)
            email_body = "Hello  " + user.username + "\nUse link below to verify your email\n" + abs_url

            payload = {
                "email_body": email_body,
                "email_subject": "Verify your Email",
            }
            Util.send_mail(data=payload)

            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(RetrieveAPIView):
    """
    Get and Update User information
    """
    permission_classes = (IsAuthenticated, IsVerified)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserProfileAPIView(RetrieveAPIView):
    """
    GET nad UPDATE user profile
    """
    permission_classes = (IsAuthenticated, IsVerified)
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_object(self):
        return self.request.user.profile


class UserAvatarAPIView(RetrieveAPIView):
    """
    GET and DELETE user avatar
    """
    permission_classes = (IsAuthenticated, IsVerified)
    serializer_class = ProfileAvatarSerializer
    queryset = Profile.objects.all()

    def get_object(self):
        return self.request.user.profile
