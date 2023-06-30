from rest_framework.permissions import BasePermission
from rest_framework.generics import get_object_or_404

from .models import Subject


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
                return request.user.groups.filter(id=subject.students.id).exists()
            elif request.user.is_teacher():
                # Allow subject's associated teachers to access the subject
                return request.user in subject.teachers.all()

        # Permission for PUT and DELETE methods
        elif request.method in ["PUT", "DELETE"]:
            if request.user.is_teacher():
                # Allow subject's associated teachers to Update and Delete
                return request.user in subject.teachers.all()
        return False
