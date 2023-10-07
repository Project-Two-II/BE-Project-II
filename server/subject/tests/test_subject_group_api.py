import json
from rest_framework import status
from django.urls import reverse

from .test_subject_api import SubjectDetailAPITests


class SubjectGroupAPITests(SubjectDetailAPITests):
    def setUp(self) -> None:
        super().setUp()
        self.subject_group_url = reverse("subject:subject-group", kwargs={"subject_id": 1})

    def test_owner_can_access_subject_group(self):
        subject = self.create_subject()
        response = self.client.get(self.subject_group_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content).get("name"), subject["code_no"]+"_group")
        return response

    def test_owner_can_add_user_in_subject_group(self):
        # create subject, student and teacher
        self.create_subject()
        self.create_student()
        self.create_teacher()

        # add them in the group
        response = self.client.put(self.subject_group_url, data={"user": 1}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.put(self.subject_group_url, data={"user": 2}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.put(self.subject_group_url, data={"user": 3}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content).get("id"), 1)
        self.assertEqual(json.loads(response.content).get("users"), [1, 2, 3])

    def test_subject_group_teacher_can_edit_subject_detail(self):
        # create subject, teacher and add teacher in that subject group
        self.create_subject()
        teacher, teacher_response = self.create_teacher()
        response = self.client.put(self.subject_group_url, data={"user": 2}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # make the teacher as requesting user
        access_token = teacher_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        # create new student and update subject group
        self.create_student()
        response = self.client.put(self.subject_group_url, data={"user": 3}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update subject information
        response = self.client.put(self.subject_detail_url,
                                   data={"description": "This is an updated description of the subject"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content).get("description"),
                         "This is an updated description of the subject")

    def test_subject_group_student_can_only_access_subject_detail(self):
        # create a subject and student
        subject = self.create_subject()
        student, student_response = self.create_student()

        # add student in subject group
        response = self.client.put(self.subject_group_url, data={"user": 2}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # set student as a requesting user by inserting JWT token in request
        access_token = student_response.data.get("tokens")["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        # create student and check if the student can update group
        self.create_student()
        response = self.client.put(self.subject_group_url, data={"user": 3}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # check if the student can access subject information
        response = self.client.get(self.subject_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content).get("code_no"), subject["code_no"])

    def test_can_not_add_non_existing_user_in_subject_group(self):
        self.create_subject()
        response = self.client.put(self.subject_group_url, data={"user": 2}, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
