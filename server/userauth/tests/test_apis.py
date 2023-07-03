import json
import jwt
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from faker import Faker

from ELabX import settings
from userauth.models import User


def get_user_data():
    fake = Faker()
    name = fake.name()
    email = fake.email()
    data = {
        "first_name": name.split(" ")[0],
        "last_name": name.split(" ")[1],
        "email": email,
        "username": email.split("@")[0],
        "role": 0,
        "password": fake.password()
    }
    return data


def verify_jwt_token(token):
    return jwt.decode(token, algorithms=["HS256"], key=settings.SECRET_KEY, verify=True)


class BaseAPITestCase(APITestCase):
    def setUp(self):
        self.register_url = reverse("userauth:create-user")

    def register_user(self):
        data = get_user_data()
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return data, response


class RegistrationAPITests(BaseAPITestCase):
    def test_no_get_method_for_register(self):
        response = self.client.get(self.register_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_create_account(self):
        data, response = self.register_user()
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, data.get("email"))

    def test_verify_jwt_token(self):
        data, response = self.register_user()
        access_token = json.loads(response.content).get("tokens")["access"]
        decoded_access_token = verify_jwt_token(access_token)
        self.assertEqual(decoded_access_token["user_id"], 1)

    def test_no_create_account_without_email(self):
        data = get_user_data()
        response = self.client.post(self.register_url,
                                    data={
                                        "first_name": data["first_name"],
                                        "last_name": data["last_name"],
                                        "username": data["username"],
                                        "role": data["role"],
                                        "password": data["password"]
                                    }, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_no_create_account_without_password(self):
        data = get_user_data()
        response = self.client.post(self.register_url,
                                    data={
                                        "first_name": data["first_name"],
                                        "last_name": data["last_name"],
                                        "email": data["email"],
                                        "username": data["username"],
                                        "role": data["role"]
                                    }, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_account_only_using_email_username_and_password(self):
        data = get_user_data()
        response = self.client.post(self.register_url,
                                    data={
                                        "email": data["email"],
                                        "username": data["username"],
                                        "password": data["password"]
                                    }, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return data, response

    def test_users_with_same_email(self):
        data, _ = self.test_create_account_only_using_email_username_and_password()
        response = self.client.post(self.register_url,
                                    data={
                                        "email": data["email"],
                                        "username": "random_username",
                                        "password": data["password"]
                                    }, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_users_with_same_username(self):
        data, _ = self.test_create_account_only_using_email_username_and_password()
        response = self.client.post(self.register_url,
                                    data={
                                        "email": "example@hmail.com",
                                        "username": data["username"],
                                        "password": data["password"]
                                    }, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_default_user_is_student(self):
        data, response = self.test_create_account_only_using_email_username_and_password()
        self.assertEqual(dict(User.ROLE_CHOICES).get(json.loads(response.content).get("role")), "Student")

    def test_user_is_teacher(self):
        data = get_user_data()
        data["role"] = 1
        response = self.client.post(self.register_url,
                                    data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(dict(User.ROLE_CHOICES).get(json.loads(response.content).get("role")), "Teacher")

    def test_create_account_with_blank_password(self):
        data = get_user_data()
        data["password"] = " "
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_create_account_with_invalid_password(self):
    #     data = get_user_data()
    #     data["password"] = "Pa63dsg$db4"
    #     response = self.client.post(self.register_url, data=data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class LoginAPITests(BaseAPITestCase):
    def setUp(self) -> None:
        self.register_url = reverse("userauth:create-user")
        self.login_url = reverse("userauth:login-user")
        self.user_info_url = reverse("userauth:user-info")

    def test_no_get_method_for_register(self):
        response = self.client.get(self.login_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_login_account(self):
        # First register a user
        data = get_user_data()
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        login_response = self.client.post(self.login_url,
                                          data={"email": data["email"], "password": data["password"]}, format="json")
        # print(login_response.data)
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
