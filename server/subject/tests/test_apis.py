import json
from faker import Faker
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse

from userauth.models import User
from subject.models import Subject


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


class SubjectListAPITests(SetupAPITestCase):
    def setUp(self) -> None:
        super().setUp()
        self.subject_list_url = reverse("subject:subject-list")
        # self.subject_detail_url = reverse("subject:subject-detail")
        # self.chapter_list_url = reverse("subject:chapter-list")
        # self.chapter_detail_url = reverse("subject:chapter-detail")
        # self.question_list_url = reverse("subject:question-list")
        # self.question_detail_url = reverse("subject:question-detail")
        # self.test_url = reverse("subject:question-test")
        # self.subject_group_url = reverse("subject:subject-group")

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


class SubjectGroupAPITests(SubjectDetailAPITests):
    def setUp(self) -> None:
        super().setUp()
        self.subject_group_url = reverse("subject:subject-group", kwargs={"subject_id": 1})

    def test_owner_can_create_subject_group(self):
        pass

    def test_owner_can_add_user_in_subject_group(self):
        pass

    def test_subject_group_user_can_access_subject_detail(self):
        pass

    def test_subject_group_teacher_can_edit_subject_detail(self):
        pass

    def test_subject_group_student_can_only_access_subject_detail(self):
        pass
