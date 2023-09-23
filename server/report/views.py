from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404


from subject.models import Subject, SubjectGroup, User
from userauth.permissions import IsVerified

from .utils import ProgressGenerator
from .permissions import StudentListInASubjectAccessPermission


class StudentReportInASubjectAPIView(APIView):
    """
    API view to generate student report in a particular subject
    """
    __student_report = {}

    @staticmethod
    def get_question(subject_id, chapter_id, question_id):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(subject.chapters, id=chapter_id)
        return get_object_or_404(chapter.questions, id=question_id)

    @staticmethod
    def user_in_subject(subject_id, user):
        subject = get_object_or_404(Subject, id=subject_id)
        group = get_object_or_404(SubjectGroup, subject=subject.id)
        return group.users.filter(email=user.email).exists()

    def get(self, request, subject_id, chapter_id, question_id, user_id, *args, **kwargs):
        user = get_object_or_404(User, id=user_id)
        if not self.user_in_subject(subject_id, user):
            return Response(data={
                "detail": "This student is not in the subject."
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            question = self.get_question(subject_id, chapter_id, question_id)
            progress_generator = ProgressGenerator
            q, s, m, r = progress_generator.get_question_report(user_id, question)
            return Response(data={
                "detail": "user_found",
            }, status=status.HTTP_200_OK)


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
            data["id"] = f"{user.id}"
            data["name"] = f"{user.first_name} {user.last_name}"
            data["email"] = f"{user.email}"
            data["progress"] = progress_generator.get_my_progress(user, subject=subject)
            self.__subject_report.append(data)
        return Response(self.__subject_report, status=status.HTTP_200_OK)
