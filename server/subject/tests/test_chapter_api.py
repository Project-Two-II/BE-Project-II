from django.urls import reverse
from rest_framework import status

from .setup_test_apis import SetupAPITestCase


class ChapterAPITestCase(SetupAPITestCase):
    def setUp(self) -> None:
        super().setUp()
        self.subject_list_url = reverse("subject:subject-list")
        self.chapter_list_url = reverse("subject:chapter-list", kwargs={"subject_id": 1})

    def create_subject(self):
        payload = {
            "code_no": "CMP 115",
            "title": "OOP in C++",
            "description": "C++ is a powerful and versatile programming language known for its efficiency, flexibility, and extensive capabilities. It is an extension of the widely used C language, adding object-oriented programming features, such as classes and inheritance, while maintaining its low-level functionality."
        }

        response = self.client.post(self.subject_list_url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_chapter(self):
        teacher, register_response = self.create_teacher()
        access_token = register_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        self.create_subject()

        payload = {
            "title": "Thinking Object Oriented",
            "description": "OOP promotes modular and organized code, making it easier to understand, maintain, and scale software systems. It encourages concepts like modularity, reusability, and separation of concerns, leading to more efficient and structured development practices. OOP is widely used in many programming languages, including C++, Java, Python, and C#.",
        }
        response = self.client.post(self.chapter_list_url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], payload["title"])
