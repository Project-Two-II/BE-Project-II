from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import UserManager

AVATAR_DIR = "user_avatar/"
DEFAULT_AVATAR = "user_avatar/default.png"


class User(AbstractUser):
    email = models.EmailField(verbose_name="Email address", unique=True)
    ROLE_CHOICES = (
        ("student", "Student"),
        ("teacher", "Teacher")
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    objects = UserManager

    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        db_table = "User_elabx"

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(default=DEFAULT_AVATAR, upload_to=AVATAR_DIR)
    bio = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "Profile_elabx"

    def __str__(self):
        return self.user.email
