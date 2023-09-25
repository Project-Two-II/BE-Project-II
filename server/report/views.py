import json

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404


from subject.models import Subject, SubjectGroup, User
from userauth.permissions import IsVerified

from .utils import ProgressGenerator, StatsGenerator
from .permissions import (
    StudentListInASubjectAccessPermission,
    StudentReportOfAQuestionAccessPermission,
    MySubjectStatsAccessPermission
)


class MySubjectsStatsAPIView(APIView):
    """
    It provides stats related to a teacher subjects
    """
    permission_classes = (IsAuthenticated, IsVerified, MySubjectStatsAccessPermission)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        _my_subject_stats = dict()
        stats_generator = StatsGenerator
        _total_subjects = stats_generator.count_my_subjects(user)
        _my_subject_stats["total_subjects"] = _total_subjects
        _total_students = stats_generator.count_my_students(user)
        _my_subject_stats["total_students"] = _total_students
        return Response(data={
            json.dumps(_my_subject_stats)
        }, status=status.HTTP_200_OK
        )


class StudentReportOfAQuestionAPIView(APIView):
    """
    API view to generate student report in a particular subject
    """
    permission_classes = (IsAuthenticated, IsVerified, StudentReportOfAQuestionAccessPermission)

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

    def get(self, request, subject_id, chapter_id, question_id, student_id=None, *args, **kwargs):
        if request.user.is_student():
            student_id = request.user.id
        user = get_object_or_404(User, id=student_id)
        if not self.user_in_subject(subject_id, user):
            return Response(data={
                "detail": "This student is not in the subject."
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            question = self.get_question(subject_id, chapter_id, question_id)
            progress_generator = ProgressGenerator
            question_report = progress_generator.get_question_report(user, question)
            question_report["role"] = self.request.user.role
            return Response(data={
                json.dumps(question_report),
            }, status=status.HTTP_200_OK)


class StudentListInASubjectAPIView(APIView):
    """
    API to fetch list with progress of student under a subject
    """
    permission_classes = (IsAuthenticated, IsVerified, StudentListInASubjectAccessPermission)

    def get(self, request, subject_id, *args, **kwargs):
        _subject_report = []
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
            _subject_report.append(data)
        return Response(json.dumps(_subject_report), status=status.HTTP_200_OK)
