import json
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from userauth.models import User
from .test_submission_api import SubmissionAPITestCase


class ReviewAPITestCase(SubmissionAPITestCase):
    def setUp(self) -> None:
        super().setUp()
        self.review_url = reverse("submission:review-list",
                                  kwargs={"subject_id": 1, "chapter_id": 1, "question_id": 1, "submission_id": 1})

    def test_teacher_can_review(self):
        self.test_enrolled_student_can_submit()

        teacher = User.objects.get(id=1)
        token = RefreshToken.for_user(teacher)
        access_token = str(token.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        payload = {
            "message": "Review is done."
        }
        response = self.client.post(self.review_url, data=payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(json.loads(response.content).get("message"), payload["message"])
        self.assertEqual(json.loads(response.content).get("reviewed_by"), teacher.id)
