import jwt
from django.urls import reverse
from faker import Faker
from rest_framework import status
from rest_framework.test import APITestCase

from ELabX import settings


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
