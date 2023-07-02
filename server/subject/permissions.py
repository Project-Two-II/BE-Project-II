from rest_framework.permissions import BasePermission
from rest_framework.generics import get_object_or_404

from .models import Subject, SubjectGroup


class SubjectAccessPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            if request.user.is_student() and request.user.is_teacher():
                # Allow student to access Subject if they are in associated group
                return self.has_object_permission(request, view)
        elif request.method == "POST":
            # Allow any teacher to send POST request
            return request.user.is_teacher()
        return False

    def has_object_permission(self, request, view, obj=None):
        subject_id = view.kwargs.get("subject_id")
        subject = get_object_or_404(Subject, id=subject_id)
        # Permission for GET request
        if request.method == "GET":
            if request.user.is_student():
                # Allow student with associated group to access subject
                return SubjectGroup.objects.filter(subject=subject_id, users=request.user).exists()
            elif request.user.is_teacher():
                # Allow subject's associated teachers to access the subject
                return (request.user is subject.owner) or (request.user in SubjectGroup.users.filter(subject))

        # Permission for PUT method
        elif request.method == "PUT":
            if request.user.is_teacher():
                # Allow subject's associated teachers to Update and Delete
                return (request.user is subject.owner) or (request.user in SubjectGroup.users.filter(subject))

        # Only subject owner can delete
        elif request.method == "DELETE":
            if request.user.is_teacher():
                return request.user is subject.owner

        return False

