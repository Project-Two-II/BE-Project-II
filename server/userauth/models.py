from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import UserManager

DEFAULT_AVATAR = "user_avatars/default.png"


def upload_to_user_avatars(instance, filename):
    """
    Upload path for user Avatar
    """
    return f"user_avatars/{instance.user.role}/{filename}"


class User(AbstractUser):
    email = models.EmailField(verbose_name="Email address", unique=True)
    ROLE_CHOICES = (
        (0, "Student"),
        (1, "Teacher")
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=0)

    objects = UserManager()

    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        db_table = "User_elabx"

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(default=DEFAULT_AVATAR, upload_to=upload_to_user_avatars)
    bio = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "Profile_elabx"

    def __str__(self):
        return self.user.email
