from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from userauth.models import User
from subject.models import Question


class Submission(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE)
    solution = models.TextField()
    submitted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def status(self):
        return Submission.objects.filter(question=self.question, submitted_by=self.submitted_by).exists()

    class Meta:
        db_table = "Submission_elabx"

    def __str__(self):
        return f"Submission of {self.question.title}"


class Result(models.Model):
    submission = models.OneToOneField(Submission, on_delete=models.CASCADE)
    marks = models.PositiveIntegerField(
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100)
        ]
    )

    @property
    def autograde(self):
        return self.submission.status

    class Meta:
        db_table = "Result_elabx"

    def __str__(self):
        return f"Result of {self.submission.question.title}"


class Comment(models.Model):
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    message = models.TextField()
    commented_by = models.ForeignKey(User, on_delete=models.CASCADE)
    commented_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Comment_elabx"

    def __str__(self):
        return f"Comment of {self.commented_by.username}"
