from django.db import models
from django.contrib.auth.models import Group

from userauth.models import User

DEFAULT_SUB_THUMB = "subject_thumbnails/default.png"


def upload_to_subject_thumbnails(instance, filename):
    """
    Define the upload path for Subject thumbnail image
    """
    return f"subject_thumbnails/{instance.code_no}/{filename}"


class SubjectGroup(Group):
    """
    Custom Group class for Subject Group
    Inherits from Django's built-in Group class
    """

    class Meta:
        proxy = True


class Subject(models.Model):
    """
    This is database table for Subject.
    There can be more than one teacher within a subject
    There is a group associated with the subject which we called students.
    When we delete Subject related Group of students will be removed.
    """
    code_no = models.CharField(unique=True, max_length=10)
    title = models.CharField(unique=True, max_length=150)
    teachers = models.ManyToManyField(User, related_name="teachers")
    students = models.OneToOneField(SubjectGroup, on_delete=models.CASCADE, null=True, blank=True, related_name="students")
    description = models.TextField()
    thumbnail = models.ImageField(default=DEFAULT_SUB_THUMB, upload_to=upload_to_subject_thumbnails, blank=True)

    class Meta:
        db_table = "Subject_elabx"

    def __str__(self):
        return self.title


class Chapter(models.Model):
    """
    This is for Chapter.
    One subject can have multiple chapters.
    If the subject is deleted, all the chapters will delete.
    """
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="chapters")

    class Meta:
        db_table = "Chapter_elabx"

    def __str__(self):
        return self.title


class Question(models.Model):
    """
    This is table for Question.
    One chapter can have multiple questions.
    If the chapter is deleted, all the questions will delete.
    """
    title = models.CharField(max_length=225, unique=True)
    description = models.TextField()
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name="questions")

    class Meta:
        db_table = "Question_elabx"

    def __str__(self):
        return self.title


class Test(models.Model):
    """
    This table is to store test code.
    One question can have one test.
    If the question is deleted, test will delete.
    """
    source_code = models.TextField()
    question = models.OneToOneField(Question, on_delete=models.CASCADE, related_name="test")

    class Meta:
        db_table = "Test_elabx"

    def __str__(self):
        return f"Test for {self.question.title}"