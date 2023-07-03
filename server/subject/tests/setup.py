from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken

from userauth.models import User
from userauth.managers import UserManager
from ..models import Subject, Chapter, Question, Test


class BaseSetup(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="testuser@elabx.com",
            username="test_user",
            role="student",
            password="test_password"
        )
        self.access_token = AccessToken.for_user(self.user)


class SubjectSetup(BaseSetup):
    def setUp(self):
        super().setUp()
        self.subject = Subject.objects.create(
            code_no="CMP 215",
            title="OOP in CPP",
            owner=self.user,
            description="Object oriented programming in cpp",
        )


class ChapterSetup(SubjectSetup):
    def setUp(self):
        super().setUp()
        self.chapter1 = Chapter.objects.create(
            title="Chapter 1",
            description="This is the desc of ch 1",
            subject=self.subject
        )
        self.chapter2 = Chapter.objects.create(
            title="Chapter 2",
            description="This is the desc of ch 2",
            subject=self.subject
        )


class QuestionSetup(ChapterSetup):
    def setUp(self):
        super().setUp()
        self.question1 = Question.objects.create(
            title="first question of chapter 1",
            description="This is the desc of question 1",
            chapter=self.chapter1
        )
        self.question2 = Question.objects.create(
            title="second question of chapter 1",
            description="This is the desc of question 2",
            chapter=self.chapter1
        )


class TestSetup(QuestionSetup):
    def setUp(self):
        super().setUp()
        Test.objects.create(
            source_code="Test of question 1 goes here",
            question=self.question1
        )
