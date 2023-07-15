import json
from rest_framework import status
from userauth.models import User

from .setup import BaseAPITestCase, get_user_data, verify_jwt_token


class RegistrationAPITests(BaseAPITestCase):
    def test_no_get_method_for_register(self):
        response = self.client.get(self.register_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(response.data["error"], "GET method is not allowed.")

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
        data.pop("email")
        response = self.client.post(self.register_url,
                                    data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Email is not valid.")

    def test_no_create_account_without_password(self):
        data = get_user_data()
        data.pop("password")
        response = self.client.post(self.register_url,
                                    data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "The password can not be empty.")

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

    def test_no_users_with_same_email(self):
        data, _ = self.test_create_account_only_using_email_username_and_password()
        response = self.client.post(self.register_url,
                                    data={
                                        "email": data["email"],
                                        "username": "random_username",
                                        "password": data["password"]
                                    }, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"), "A user with this email address already exists.")

    def test_no_users_with_same_username(self):
        data, _ = self.test_create_account_only_using_email_username_and_password()
        response = self.client.post(self.register_url,
                                    data={
                                        "email": "example@hmail.com",
                                        "username": data["username"],
                                        "password": data["password"]
                                    }, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"), "A user with that username already exists.")

    def test_no_users_with_same_email_and_username(self):
        data, _ = self.test_create_account_only_using_email_username_and_password()
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"), "A user with this email address already exists.")

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

    def test_no_create_account_with_blank_password(self):
        data = get_user_data()
        data["password"] = " "
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "The password must be at least 8 characters long.")

    def test_no_create_account_with_less_password_character(self):
        data = get_user_data()
        data["password"] = "Pass"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "The password must be at least 8 characters long.")

    def test_no_create_account_with_more_password_character(self):
        data = get_user_data()
        data["password"] = "PasssuoYFDCUTGJ56231@$81651_9^%#*1"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "The password must be at most 20 characters long.")

    def test_no_create_account_with_no_lowercase_password_character(self):
        data = get_user_data()
        data["password"] = "PPB%$#123ITDY"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "The password must contain at least one lowercase letter.")

    def test_no_create_account_with_no_uppercase_password_character(self):
        data = get_user_data()
        data["password"] = "password123$#"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "The password must contain at least one uppercase letter.")

    def test_no_create_account_with_no_integer_password_character(self):
        data = get_user_data()
        data["password"] = "passwordGD$#"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "The password must contain at least one digit.")

    def test_no_create_account_with_no_special_password_character(self):
        data = get_user_data()
        data["password"] = "password123PS"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(json.loads(response.content).get("error"),
                         "The password must contain at least one special letter.")

    def test_no_create_account_with_invalid_email(self):
        data = get_user_data()
        data["email"] = "123email.com"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Email is not valid.")

        data["email"] = "email@com"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Email is not valid.")

        data["email"] = "@hash.com"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Email is not valid.")

    def test_create_account_with_full_length_email(self):
        data = get_user_data()
        data["email"] = "example.1234@email.com.np"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        data = get_user_data()
        data["email"] = "user.191445@ncit.edu.np"
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
