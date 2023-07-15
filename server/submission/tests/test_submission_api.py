from django.urls import reverse
from rest_framework import status

from .setup import SetupAPITestCase


class SubmissionAPITestCase(SetupAPITestCase):

    def setUp(self) -> None:
        super().setUp()
        self.submission_url = reverse("submission:submission",
                                      kwargs={"subject_id": 1, "chapter_id": 1, "question_id": 1})

    def test_enrolled_student_can_submit(self):
        access_token = self.enroll_student()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        payload = {
            "solution": "This is solution."
        }
        response = self.client.post(self.submission_url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["solution"], payload["solution"])
