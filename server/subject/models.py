from django.db import models
from django.contrib.auth.models import Group

from userauth.models import User

DEFAULT_SUB_THUMB = "subject_thumbnails/default.png"


def upload_to_subject_thumbnails(instance, filename):
    """
    Define the upload path for Subject thumbnail image
    """
    return f"subject_thumbnails/{instance.code_no}/{filename}"


class Subject(models.Model):
    """
    This is database table for Subject.
    There can be more than one teacher within a subject
    There is a group associated with the subject which we called students.
    When we delete Subject related Group of students will be removed.
    """
    code_no = models.CharField(max_length=10)
    title = models.CharField(max_length=150)
    owner = models.ForeignKey(User, on_delete=models.PROTECT, related_name="subjects")
    description = models.TextField()
    thumbnail = models.ImageField(default=DEFAULT_SUB_THUMB, upload_to=upload_to_subject_thumbnails, blank=True)

    class Meta:
        db_table = "Subject_elabx"

    def __str__(self):
        return self.title


class SubjectEnrollment(models.Model):
    """
    This is model for self enrollment. It stores enrollment key to particular subject
    """
    subject = models.OneToOneField(Subject, on_delete=models.CASCADE, related_name="enrollment")
    key = models.CharField(max_length=15, blank=False, null=False)

    class Meta:
        db_table = "SubjectEnrollment_elabx"


class SubjectGroup(Group):
    """
    Custom Group class for Subject Group
    Inherits from Django's built-in Group class
    One subject can have one group, and
    """
    subject = models.OneToOneField(Subject, on_delete=models.CASCADE, related_name="group")
    users = models.ManyToManyField(User, blank=True, related_name="subject_groups")

    class Meta:
        db_table = "SubjectGroup_elabx"


class Chapter(models.Model):
    """
    This is for Chapter.
    One subject can have multiple chapters.
    If the subject is deleted, all the chapters will delete.
    """
    title = models.CharField(max_length=255)
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
    title = models.CharField(max_length=225)
    description = models.TextField()
    boilerplate = models.CharField(max_length=255)
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
