from rest_framework.permissions import BasePermission


class BaseAccessPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.role == "Student":
            return request.method in ["GET"]
        elif request.user.role == "Teacher":
            return True
        return False
