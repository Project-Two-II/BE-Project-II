from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from userauth.models import User
from subject.models import Question


class Submission(models.Model):
    """
    Submission model, used to submit a solution by a user i.e. Student
    A question can have multiple submission and a user can have multiple submission
    A user and a question can have only one submission
    """
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    solution = models.TextField()
    submitted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def status(self):
        # check if the user submitted the question
        return Submission.objects.filter(question=self.question, submitted_by=self.submitted_by).exists()

    class Meta:
        unique_together = ("question", "submitted_by")
        db_table = "Submission_elabx"

    def __str__(self):
        return f"Submission of {self.question.title}"


class Result(models.Model):
    """
    Model to store Result. There are two types of Result
    i. autograde, if the user have submission to particular question
    ii. marks, given by teacher
    """
    submission = models.OneToOneField(Submission, on_delete=models.PROTECT)
    marks = models.PositiveIntegerField(
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100)
        ]
    )

    @property
    def autograde(self):
        # Autograde if user submits the solution of a question
        return self.submission.status

    class Meta:
        db_table = "Result_elabx"

    def __str__(self):
        return f"Result of {self.submission.question.title}"


class Review(models.Model):
    """
    Model for Review. Teacher can review the solution submitted by student.
    """
    submission = models.OneToOneField(Submission, on_delete=models.CASCADE)
    message = models.TextField()
    reviewed_by = models.ForeignKey(User, on_delete=models.CASCADE)
    reviewed_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Review_elabx"

    def __str__(self):
        return f"Comment of {self.reviewed_by.username}"
