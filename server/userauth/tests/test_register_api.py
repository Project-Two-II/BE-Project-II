import json
from django.urls import reverse
from rest_framework import status
from userauth.models import User

from .setup import BaseAPITestCase, get_user_data, verify_jwt_token


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

    def test_create_account_with_less_password_character(self):
        data = get_user_data()
        data["password"] = "Pass"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "['The password must be at least 8 characters long.']")

    def test_create_account_with_no_lowercase_password_character(self):
        data = get_user_data()
        data["password"] = "PPB%$#123ITDY"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "['The password must contain at least one lowercase letter.']")

    def test_create_account_with_no_uppercase_password_character(self):
        data = get_user_data()
        data["password"] = "password123$#"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "['The password must contain at least one uppercase letter.']")

    def test_create_account_with_no_integer_password_character(self):
        data = get_user_data()
        data["password"] = "passwordGD$#"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "['The password must contain at least one digit.']")

    def test_create_account_with_no_special_character_password_character(self):
        data = get_user_data()
        data["password"] = "password123PS"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "['The password must contain at least one special letter.']")
