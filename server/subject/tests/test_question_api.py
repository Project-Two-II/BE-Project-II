from django.urls import reverse
from rest_framework import status

from .test_chapter_api import ChapterAPITestCase


class QuestionAPITestCase(ChapterAPITestCase):
    def setUp(self) -> None:
        super().setUp()
        self.question_list_url = reverse("subject:question-list", kwargs={"subject_id": 1, "chapter_id": 1})

    def test_create_question(self):
        self.test_create_chapter()
        payload = {
            "title": "Add two integer numbers",
            "description": "Declare two integer variables and and print their sum",
            "boilerplate": "int sum(int a, int b){}",
        }
        response = self.client.post(self.question_list_url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], payload["title"])
