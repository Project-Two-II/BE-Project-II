from rest_framework.generics import get_object_or_404
from rest_framework.permissions import BasePermission

from subject.models import Subject
from subject.models import SubjectGroup


class ReviewAccessPermission(BasePermission):
    """
    Permission class for Review, can review by teacher of that subject
    """
    def has_permission(self, request, view):
        subject_id = view.kwargs.get("subject_id")
        subject = get_object_or_404(Subject, id=subject_id)

        if SubjectGroup.objects.filter(subject=subject, users=request.user).exists():
            if request.method == "GET":
                return True
            else:
                return request.user.is_teacher()


class ResultAccessPermission(ReviewAccessPermission):
    """
    Teacher of that subject can see result of all student. Student can view own result
    """
    pass


class SubmissionAccessPermission(BasePermission):
    """
    The only enrolled student can submit solution
    """
    def has_permission(self, request, view):
        subject_id = view.kwargs.get("subject_id")
        subject = get_object_or_404(Subject, id=subject_id)

        if SubjectGroup.objects.filter(subject=subject, users=request.user).exists():
            if request.method == "GET":
                return True
            elif request.method == "POST":
                return request.user.is_student()
