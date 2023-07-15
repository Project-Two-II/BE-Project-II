import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from userauth.models import User

from .setup import BaseAPITestCase, verify_jwt_token


class LoginAPITests(BaseAPITestCase):
    def setUp(self) -> None:
        self.register_url = reverse("userauth:create-user")
        self.login_url = reverse("userauth:login-user")
        self.user_info_url = reverse("userauth:user-info")

    def test_no_get_method_for_login(self):
        response = self.client.get(self.login_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(json.loads(response.content).get("error"), "GET method is not allowed.")

    def test_login_account(self):
        data, response = self.register_user()

        login_response = self.client.post(self.login_url,
                                          data={"email": data["email"], "password": data["password"]}, format="json")
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertEqual(login_response.data.get("email"), data["email"])
        return data, login_response

    def test_verify_jwt_token_after_login(self):
        data, login_response = self.test_login_account()
        access_token = json.loads(login_response.content).get("tokens")["access"]
        decoded_access_token = verify_jwt_token(access_token)
        self.assertEqual(decoded_access_token["user_id"], 1)

    def test_logged_user_info(self):
        data, login_response = self.test_login_account()
        access_token = login_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        user_info_response = self.client.get(self.user_info_url)
        self.assertEqual(user_info_response.status_code, status.HTTP_200_OK)
        self.assertEqual(user_info_response.data.get("email"), data["email"])
        self.assertEqual(user_info_response.data.get("first_name"), data["first_name"])

    def test_login_with_invalid_credentials(self):
        data, response = self.register_user()
        login_response = self.client.post(self.login_url,
                                          data={"email": "email@gmail.com",
                                                "password": data["password"]}, format="json")
        self.assertEqual(login_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(login_response.content).get("error"), "Invalid credentials.")

        login_response = self.client.post(self.login_url,
                                          data={"email": data["email"],
                                                "password": "r13$Tpassword"}, format="json")
        self.assertEqual(login_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(login_response.content).get("error"), "Invalid credentials.")
