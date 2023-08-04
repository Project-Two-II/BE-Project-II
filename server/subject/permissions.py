from rest_framework.permissions import BasePermission
from rest_framework.generics import get_object_or_404

from .models import Subject, SubjectGroup


class SubjectListAccessPermission(BasePermission):
    """
    It defines user permission to access Subject List.
    Any teacher can create a subject but student only can see subject lists
    """

    def has_permission(self, request, view):
        if request.method == "GET":
            # Allow any user to send GET request
            return request.user.is_student() or request.user.is_teacher()
        elif request.method == "POST":
            # Allow any teacher to send POST request
            return request.user.is_teacher()
        return False


class SubjectDetailAccessPermission(BasePermission):
    """
    Access permission for subject detail
    """
    def has_permission(self, request, view):
        if request.method == "GET":
            if request.user.is_student() or request.user.is_teacher():
                # Allow student to access Subject if they are in associated group
                return self.has_object_permission(request, view)
        elif request.method == "POST":
            # Allow any teacher to send POST request
            return self.has_object_permission(request, view)
        elif request.method in ["PUT", "DELETE"]:
            if request.user.is_student() or request.user.is_teacher():
                # Allow student to access Subject if they are in associated group
                return self.has_object_permission(request, view)
        return False

    def has_object_permission(self, request, view, obj=None):
        subject_id = view.kwargs.get("subject_id")
        subject = get_object_or_404(Subject, id=subject_id)

        # Permission for GET request
        if request.method == "GET":
            if request.user.is_student():
                # Allow student with associated group to access subject
                return SubjectGroup.objects.filter(subject=subject, users=request.user).exists()
            elif request.user.is_teacher():
                # Allow subject's associated teachers to access the subject
                return (request.user == subject.owner) or \
                    (SubjectGroup.objects.filter(subject=subject, users=request.user).exists())

        # Permission for POST and PUT method
        elif request.method in ["POST", "PUT"]:
            if request.user.is_teacher():
                # Allow subject's associated teachers to Update and post
                return (request.user == subject.owner) or \
                    (SubjectGroup.objects.filter(subject=subject, users=request.user).exists())

        # Only subject owner can delete
        elif request.method == "DELETE":
            if request.user.is_teacher():
                return request.user == subject.owner

        return False


class ChapterAccessPermission(SubjectDetailAccessPermission):
    pass


class QuestionAccessPermission(SubjectDetailAccessPermission):
    pass


class TestAccessPermission(SubjectDetailAccessPermission):
    pass


class SubjectGroupAccessPermission(SubjectDetailAccessPermission):
    pass


class MySubjectAccessPermission(SubjectListAccessPermission):
    pass


class SelfEnrollmentPermission(BasePermission):
    """
    Permission for self enrollment
    """
    def has_permission(self, request, view):
        if request.method == "POST":
            return request.user.is_teacher() or request.user.is_student()
        return False


class EnrollmentKeyAccessPermission(BasePermission):
    """
    Define permission to add enrollment key in particular subject
    """
    def has_permission(self, request, view):
        subject_id = view.kwargs.get("subject_id")
        subject = get_object_or_404(Subject, id=subject_id)

        if request.method in ["GET", "POST"]:
            if request.user.is_teacher():
                # Allow subject's associated teachers to view and create
                return (request.user == subject.owner) or \
                    (SubjectGroup.objects.filter(subject=subject, users=request.user).exists())
