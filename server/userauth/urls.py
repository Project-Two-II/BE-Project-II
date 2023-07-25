from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    UserProfileAPIView,
    UserLoginAPIView,
    UserRegistrationAPIView,
    UserLogoutAPIView,
    UserAvatarAPIView,
    UserAPIView,
    ChangePasswordAPIView,
    VerifyEmailAPIView,
    RequestPasswordResetEmailAPIView,
    PasswordResetTokenCheckAPIView,
    SetNewPasswordAPIView,
)

app_name = "userauth"

urlpatterns = [
    path("", UserAPIView.as_view(), name="user-info"),
    path("profile/", UserProfileAPIView.as_view(), name="user-profile"),
    path("profile/avatar/", UserAvatarAPIView.as_view(), name="user-avatar"),
    path("register/", UserRegistrationAPIView.as_view(), name="create-user"),
    path("login/", UserLoginAPIView.as_view(), name="login-user"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("change-password/", ChangePasswordAPIView.as_view(), name="change-password"),
    path("verify-email/", VerifyEmailAPIView.as_view(), name="verify-email"),
    path("request-password-reset",
         RequestPasswordResetEmailAPIView.as_view(), name="request-password-reset"),
    path("password-reset/<uidb64>/<token>",
         PasswordResetTokenCheckAPIView.as_view(), name="password-reset-confirm"),
    path("set-new-password", SetNewPasswordAPIView.as_view(), name="password-reset-complete"),
]
