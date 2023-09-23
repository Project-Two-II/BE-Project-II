from rest_framework.generics import get_object_or_404
from rest_framework.permissions import BasePermission

from subject.models import Subject, SubjectGroup


class StudentListInASubjectAccessPermission(BasePermission):
    """
    Permission class to view list of student with their progress
    """
    def has_permission(self, request, view):
        subject_id = view.kwargs.get("subject_id")
        subject = get_object_or_404(Subject, id=subject_id)

        if SubjectGroup.objects.filter(subject=subject, users=request.user).exists():
            if request.method == "GET":
                return request.user.is_teacher()
            else:
                return False
