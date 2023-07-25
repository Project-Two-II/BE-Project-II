from django.urls import reverse
from rest_framework import status

from .setup import BaseAPITestCase


class ChangePasswordAPITestCase(BaseAPITestCase):
    def setUp(self):
        super().setUp()
        self.change_password_url = reverse("userauth:change-password")
        self.login_url = reverse("userauth:login-user")

    def test_user_can_change_password(self):
        # create user
        user, response = self.register_user()
        access_token = response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        # login user
        login_response = self.client.post(self.login_url,
                                          data={"email": user["email"], "password": user["password"]})
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertEqual(login_response.data.get("email"), user["email"])

        # change password
        response = self.client.put(self.change_password_url,
                                   data={"old_password": user["password"], "new_password": "NewPass@123"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "Password updated successfully.")
