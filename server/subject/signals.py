from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Subject, SubjectGroup

User = get_user_model()


@receiver(post_save, sender=Subject)
def create_group(sender, instance, created, **kwargs):
    """
    Automatically create a group for a subject when it is created.
    """
    if created:
        group_name = f"{instance.code_no}_group"
        SubjectGroup.objects.create(name=group_name, subject=instance)
        SubjectGroup.objects.get(name=group_name).users.add(instance.owner.id)
