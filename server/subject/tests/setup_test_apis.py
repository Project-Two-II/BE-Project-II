from faker import Faker
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse


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


def get_subject_data():
    fake = Faker()
    data = {
        "code_no": "CMP " + fake.password()[:5],
        "title": "OOP in CPP by " + fake.name(),
        "description": "This is programming " + fake.email()
    }
    return data


class SetupAPITestCase(APITestCase):
    def setUp(self) -> None:
        self.register_url = reverse("userauth:create-user")

    def create_student(self):
        data = get_user_data()
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return data, response

    def create_teacher(self):
        data = get_user_data()
        data["role"] = 1
        response = self.client.post(self.register_url, data=data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        return data, response
