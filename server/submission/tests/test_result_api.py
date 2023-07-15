import json
from django.urls import reverse
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from userauth.models import User

from .test_submission_api import SubmissionAPITestCase


class ResultAPITestCase(SubmissionAPITestCase):
    def setUp(self) -> None:
        super().setUp()
        self.result_url = reverse("submission:result",
                                  kwargs={"subject_id": 1, "chapter_id": 1, "question_id": 1, "submission_id": 1})

    def test_give_marks_by_teacher(self):
        self.test_enrolled_student_can_submit()

        teacher = User.objects.get(id=1)

        token = RefreshToken.for_user(teacher)
        access_token = str(token.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        payload = {
            "marks": 50,
        }

        response = self.client.post(self.result_url, data=payload, fromat="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.loads(response.content).get("marks"), payload["marks"])
