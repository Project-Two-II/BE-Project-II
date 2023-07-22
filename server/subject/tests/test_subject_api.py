import json
from django.urls import reverse
from rest_framework import status

from userauth.models import User
from .setup_test_apis import SetupAPITestCase, get_subject_data


class SubjectListAPITests(SetupAPITestCase):
    def setUp(self) -> None:
        super().setUp()
        self.subject_list_url = reverse("subject:subject-list")

    def test_no_access_subject_list_without_authentication(self):
        response = self.client.get(self.subject_list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(json.loads(response.content).get("detail"),
                         "Authentication credentials were not provided.")

    def test_student_can_not_create_subject(self):
        _, register_response = self.create_student()
        access_token = register_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        response = self.client.post(self.subject_list_url, data=get_subject_data(), format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_teacher_can_create_subject(self):
        teacher_data, register_response = self.create_teacher()
        access_token = register_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        response = self.client.post(self.subject_list_url, data=get_subject_data(), format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(str(User.objects.get(id=json.loads(response.content).get("owner"))),
                         teacher_data["email"])

    def test_authenticated_user_as_student_can_access_subject_list(self):
        self.test_teacher_can_create_subject()
        _, register_response = self.create_student()
        access_token = register_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
        response = self.client.get(self.subject_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class SubjectDetailAPITests(SetupAPITestCase):
    def setUp(self) -> None:
        super().setUp()
        self.subject_detail_url = reverse("subject:subject-detail", kwargs={"subject_id": 1})
        self.subject_list_url = reverse("subject:subject-list")

    def create_subject(self):
        teacher, register_response = self.create_teacher()
        access_token = register_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
        subject_data = get_subject_data()
        response = self.client.post(self.subject_list_url, data=subject_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(str(User.objects.get(id=json.loads(response.content).get("owner"))),
                         teacher["email"])
        return subject_data

    def test_owner_can_access_subject_detail(self):
        subject_data = self.create_subject()
        access_response = self.client.get(self.subject_detail_url)
        self.assertEqual(access_response.status_code, status.HTTP_200_OK)
        self.assertEqual(access_response.data.get("code_no"), subject_data["code_no"])

    def test_just_student_can_not_access_subject_detail(self):
        self.create_subject()
        student, response = self.create_student()
        access_token = response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
        access_response = self.client.get(self.subject_detail_url)
        self.assertEqual(access_response.status_code, status.HTTP_403_FORBIDDEN)

    def test_just_teacher_can_not_access_subject_detail(self):
        self.create_subject()
        teacher, response = self.create_teacher()
        access_token = response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
        access_response = self.client.get(self.subject_detail_url)
        self.assertEqual(access_response.status_code, status.HTTP_403_FORBIDDEN)
