from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from userauth.models import User
from userauth.serializers import UserSerializer
from .permissions import SubjectListAccessPermission, SubjectDetailAccessPermission
from .models import Subject, Chapter, Question, Test, SubjectGroup
from .serializers import (
    SubjectSerializer,
    ChapterSerializer,
    QuestionSerializer,
    TestSerializer,
    SubjectGroupSerializer
)


class SubjectGroupAPIView(APIView):
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get(self, request, subject_id, *args, **kwargs):
        # Get group and students from request
        group = get_object_or_404(SubjectGroup, subject=subject_id)
        serializer = SubjectGroupSerializer(group)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        data = request.data
        data["subject"] = subject.id
        serializer = SubjectGroupSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, subject_id, *args, **kwargs):
        group = get_object_or_404(SubjectGroup, subject=subject_id)
        user = get_object_or_404(User, id=request.data["user"])
        group.users.add(user)
        serializer = SubjectGroupSerializer(group)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, subject_id, *args, **kwargs):
        group = get_object_or_404(SubjectGroup, subject=subject_id)
        user = get_object_or_404(User, id=request.data["user"])
        group.users.remove(user)
        serializer = SubjectGroupSerializer(group)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


class TestApiView(APIView):
    """
    CRUD for test of a question
    """
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get_object(self, subject_id, chapter_id, question_id):
        try:
            subject = get_object_or_404(Subject, id=subject_id)
            chapter = get_object_or_404(subject.chapters, id=chapter_id)
            question = get_object_or_404(chapter.questions, id=question_id)
            return question.test
        except Test.DoesNotExist:
            return None

    def get(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        test = self.get_object(subject_id, chapter_id, question_id)
        if not test:
            return Response(
                {"detail": "Test of given question does not exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = TestSerializer(test, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        question = self.get_object(subject_id, chapter_id, question_id)
        serializer = TestSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            test = serializer.save()
            question.test = test
            question.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        test = self.get_object(subject_id, chapter_id, question_id)
        if not test:
            return Response(
                {"detail": "Test of the given question does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TestSerializer(test, data=request.data, context={"request": request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        test = self.get_object(subject_id, chapter_id, question_id).test
        if not test:
            return Response(
                {"detail": "Test of the given question does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        test.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionListApiView(APIView):
    """
    Return list of all the question under that chapter
    """
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get(self, request, subject_id, chapter_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(Chapter, id=chapter_id, subject=subject)
        questions = chapter.questions.all()
        serializer = QuestionSerializer(questions, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, chapter_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(subject.chapters, id=chapter_id)
        serializer = QuestionSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(chapter=chapter)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionDetailApiView(APIView):
    """
    Return the detail of a question
    """
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get_object(self, subject_id, chapter_id, question_id):
        try:
            subject = get_object_or_404(Subject, id=subject_id)
            chapter = get_object_or_404(subject.chapters, id=chapter_id)
            return chapter.questions.filter(id=question_id)
        except Question.DoesNotExist:
            return None

    def get(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        question = self.get_object(subject_id, chapter_id, question_id)
        if not question:
            return Response(
                {"detail": "Question does not exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = QuestionSerializer(question, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        question = self.get_object(subject_id, chapter_id, question_id)
        if not question:
            return Response(
                {"detail": "Question does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = QuestionSerializer(question, data=request.data, context={"request": request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        question = self.get_object(subject_id, chapter_id, question_id)
        if not question:
            return Response(
                {"detail": "Question does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ChapterListApiView(APIView):
    """
    It shows the list of all available chapters under that subject
    """
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get(self, request, subject_id, *args, **kwargs):
        chapters = Chapter.objects.filter(subject=subject_id)
        serializer = ChapterSerializer(chapters, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        serializer = ChapterSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(subject=subject)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChapterDetailApiView(APIView):
    """
    Shows details of a chapter.
    """
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get_object(self, subject_id, chapter_id):
        try:
            return Chapter.objects.get(subject=subject_id, id=chapter_id)
        except Chapter.DoesNotExist:
            return None

    def get(self, request, subject_id, chapter_id, *args, **kwargs):
        chapter = self.get_object(subject_id, chapter_id)
        if not chapter:
            return Response(
                {"detail": "Chapter does not exists."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = ChapterSerializer(chapter, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, subject_id, chapter_id, *args, **kwargs):
        chapter = self.get_object(subject_id, chapter_id)
        if not chapter:
            return Response(
                {"detail": "Chapter does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ChapterSerializer(chapter, data=request.data, context={"request": request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, subject_id, chapter_id, *args, **kwargs):
        chapter = self.get_object(subject_id, chapter_id)
        if not chapter:
            return Response(
                {"detail": "Chapter does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        chapter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SubjectListApiView(APIView):
    """
    It shows the list of all available subjects
    Any Teacher can send POST request,
    and associated user can send GET request
    """
    permission_classes = (IsAuthenticated, SubjectListAccessPermission)

    def get(self, request, *args, **kwargs):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        request.data["owner"] = self.request.user.id
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubjectDetailApiView(APIView):
    """
    Shows details of a Subject.
    Student and teachers associated with the subject can access Subject
    Moreover Teachers associated with subject can Update and Delete the subject
    """
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get_object(self, subject_id):
        try:
            return Subject.objects.get(id=subject_id)
        except Subject.DoesNotExist:
            return None

    def get(self, request, subject_id, *args, **kwargs):
        subject = self.get_object(subject_id)
        if not subject:
            return Response(
                {"detail": "Subject does not exists."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = SubjectSerializer(subject)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, subject_id, *args, **kwargs):
        subject = self.get_object(subject_id)
        if not subject:
            return Response(
                {"detail": "Subject does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = SubjectSerializer(subject, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, subject_id, *args, **kwargs):
        subject = self.get_object(subject_id)
        if not subject:
            return Response(
                {"detail": "Subject does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        subject.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
