from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    ProfileAPIView,
    UserLoginAPIView,
    UserRegistrationAPIView,
    UserLogoutAPIView
)

urlpatterns = [
    path("register/", UserRegistrationAPIView.as_view(), name="create-user"),
    path("login/", UserLoginAPIView.as_view(), name="login-user"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("", ProfileAPIView.as_view(), name="user-profile")
]
