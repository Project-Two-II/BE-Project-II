import json
from faker import Faker
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

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


class SetupAPITestCase(APITestCase):
    def setUp(self) -> None:
        self.register_url = reverse("userauth:create-user")
        self.subject_list_url = reverse("subject:subject-list")
        self.subject_detail_url = reverse("subject:subject-detail", kwargs={"subject_id": 1})
        self.chapter_list_url = reverse("subject:chapter-list", kwargs={"subject_id": 1})
        self.chapter_detail_url = reverse("subject:chapter-detail", kwargs={"subject_id": 1, "chapter_id": 1})
        self.question_list_url = reverse("subject:question-list", kwargs={"subject_id": 1, "chapter_id": 1})
        self.question_detail_url = reverse("subject:question-detail", kwargs={"subject_id": 1, "chapter_id": 1, "question_id": 1})
        self.subject_group_url = reverse("subject:subject-group", kwargs={"subject_id": 1})

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

    def create_subject(self):
        payload = {
            "code_no": "CMP 115",
            "title": "OOP in C++",
            "description": "C++ is a powerful and versatile programming language known for its efficiency, flexibility, and extensive capabilities. It is an extension of the widely used C language, adding object-oriented programming features, such as classes and inheritance, while maintaining its low-level functionality."
        }

        response = self.client.post(self.subject_list_url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def create_chapter(self):
        self.create_subject()
        payload = {
            "title": "Thinking Object Oriented",
            "description": "OOP promotes modular and organized code, making it easier to understand, maintain, and scale software systems. It encourages concepts like modularity, reusability, and separation of concerns, leading to more efficient and structured development practices. OOP is widely used in many programming languages, including C++, Java, Python, and C#.",
        }
        response = self.client.post(self.chapter_list_url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def create_question(self):
        self.create_chapter()
        payload = {
            "title": "Add two integer numbers",
            "description": "Declare two integer variables and and print their sum",
            "boilerplate": "int sum(int a, int b){}",
        }
        response = self.client.post(self.question_list_url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def enroll_student(self):
        teacher, register_response = self.create_teacher()
        access_token = register_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        self.create_question()
        student, resp = self.create_student()

        response = self.client.put(self.subject_group_url, data={"user": 2}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        return resp.data.get("tokens")["access"]
