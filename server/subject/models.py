from django.db import models

SUB_THUMB_DIR = "subject_thumb/"
DEFAULT_SUB_THUMB = "subject_thumb/default.png"


class Subject(models.Model):
    """
    This is database table for Subject.
    """
    code_no = models.CharField(unique=True, max_length=50)
    title = models.CharField(unique=True, max_length=255)
    description = models.TextField()
    thumbnail = models.ImageField(default=DEFAULT_SUB_THUMB, upload_to=SUB_THUMB_DIR, blank=True)

    class Meta:
        db_table = "Subject_elabx"

    def __str__(self):
        return self.title


class Chapter(models.Model):
    """
    This is for Chapter.
    One subject can have multiple chapters.
    """
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    class Meta:
        db_table = "Chapter_elabx"

    def __str__(self):
        return self.title


class Question(models.Model):
    """
    This is table for Question.
    One chapter can have multiple questions.
    """
    title = models.CharField(max_length=225, unique=True)
    description = models.TextField()
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)

    class Meta:
        db_table = "Question_elabx"

    def __str__(self):
        return self.title


class Test(models.Model):
    """
    This table is to store test code.
    One question can have one test.
    """
    source_code = models.TextField()
    question = models.OneToOneField(Question, on_delete=models.CASCADE)

    class Meta:
        db_table = "Test_elabx"

    def __str__(self):
        return f"Test for {self.question.title}"
