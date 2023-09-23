from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404


from subject.models import Subject, SubjectGroup
from userauth.permissions import IsVerified

from .utils import ProgressGenerator
from .permissions import StudentListInASubjectAccessPermission


class StudentListInASubjectAPIView(APIView):
    """
    API to fetch list with progress of student under a subject
    """
    permission_classes = (IsAuthenticated, IsVerified, StudentListInASubjectAccessPermission)

    __subject_report = []

    def get(self, request, subject_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        group = get_object_or_404(SubjectGroup, subject=subject.id)

        progress_generator = ProgressGenerator
        users = group.users.all()
        for user in users:
            data = dict()
            data["name"] = f"{user.first_name} {user.last_name}"
            data["email"] = f"{user.email}"
            data["progress"] = progress_generator.get_my_progress(user, subject=subject)
            self.__subject_report.append(data)
        return Response(self.__subject_report, status=status.HTTP_200_OK)
