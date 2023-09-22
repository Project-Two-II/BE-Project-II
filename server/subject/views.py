from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.core.exceptions import ValidationError

from userauth.models import User
from userauth.permissions import IsVerified
from .models import Subject, Chapter, Question, Test, SubjectGroup, SubjectEnrollment
from .permissions import (
    SubjectListAccessPermission,
    SubjectDetailAccessPermission,
    ChapterAccessPermission,
    QuestionAccessPermission,
    TestAccessPermission,
    SubjectGroupAccessPermission,
    MySubjectAccessPermission,
    SelfEnrollmentPermission,
    EnrollmentKeyAccessPermission,
)
from .serializers import (
    SubjectSerializer,
    ChapterSerializer,
    QuestionSerializer,
    TestSerializer,
    SubjectGroupSerializer,
    SubjectEnrollmentSerializer,
)


class AddEnrollmentKeyAPIView(APIView):
    """
    API view for adding enrollment key to particular subject
    """
    permission_classes = (IsAuthenticated, IsVerified, EnrollmentKeyAccessPermission)

    def grt_current_user(self):
        return self.request.user

    def get(self, request, subject_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        enrolment = get_object_or_404(SubjectEnrollment, subject=subject)
        serializer = SubjectEnrollmentSerializer(enrolment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        payload = request.data.copy()
        payload["subject"] = subject.id
        serializer = SubjectEnrollmentSerializer(data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response(data={"detail": "Enrollment key added successfully.",
                                  "subject": subject.title,
                                  "key": serializer.data.get("key")},
                            status=status.HTTP_201_CREATED)
        if "subject" in serializer.errors:
            return Response(data={"detail": "Enrollment key for that subject already exists."},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={"detail": "Requested fields are invalid."}, status=status.HTTP_400_BAD_REQUEST)


class SelfEnrollmentAPIView(APIView):
    """
    It handles the self enrollment stuff.
    """
    permission_classes = (IsAuthenticated, IsVerified, SelfEnrollmentPermission)

    def get_current_user(self):
        return self.request.user

    def enroll_user(self, requested_key, subject):
        user = self.get_current_user()
        actual_key = get_object_or_404(SubjectEnrollment, subject=subject).key
        if SubjectGroup.objects.get(subject=subject) in [SubjectGroup.objects.get(users=user)]:
            raise ValueError("You are already enrolled.")
        if not actual_key:
            raise ValueError("Self enrollment is not available.")
        if requested_key == actual_key:
            SubjectGroup.objects.get(subject=subject).users.add(user)
        else:
            raise ValidationError("Key is invalid.")

    def post(self, request, subject_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        key = request.data.get("key")
        try:
            self.enroll_user(key, subject)
            return Response(data={"detail": "Successfully enrolled.", "subject": subject.title, "key": key},
                            status=status.HTTP_200_OK)
        except ValueError as e:
            return Response(data={"detail": str(e)},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(data={"detail": str(e)[2:-2]},
                            status=status.HTTP_400_BAD_REQUEST)


class MySubjectAPIView(APIView):
    """
    Return the list of all the subjects either user enrolled or created
    """
    permission_classes = (IsAuthenticated, IsVerified, MySubjectAccessPermission)

    def grt_current_user(self):
        return self.request.user

    def get(self, *args, **kwargs):
        user = self.grt_current_user()
        subjects = [group.subject for group in SubjectGroup.objects.filter(users=user)]
        # subject = Subject.objects.filter(owner=user.id)

        serializer = SubjectSerializer(subjects, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class SubjectGroupAPIView(APIView):
    permission_classes = (IsAuthenticated, IsVerified, SubjectGroupAccessPermission)

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
        print(group)
        user = get_object_or_404(User, email=request.data["user"])
        print(user)
        group.users.add(user)
        user.subject_groups.add(group)
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
    permission_classes = (IsAuthenticated, IsVerified, TestAccessPermission)

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
        serializer = TestSerializer(data=request.data)
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
        serializer = TestSerializer(test, data=request.data, partial=True)
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
    permission_classes = (IsAuthenticated, IsVerified, QuestionAccessPermission)

    def get(self, request, subject_id, chapter_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(Chapter, id=chapter_id, subject=subject)
        questions = chapter.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, chapter_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(subject.chapters, id=chapter_id)
        payload = request.data.copy()
        payload["chapter"] = chapter_id
        serializer = QuestionSerializer(data=payload)
        if serializer.is_valid():
            serializer.save(chapter=chapter)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class QuestionDetailApiView(APIView):
    """
    Return the detail of a question
    """
    permission_classes = (IsAuthenticated, IsVerified, QuestionAccessPermission)

    def get_object(self, subject_id, chapter_id, question_id):
        try:
            subject = get_object_or_404(Subject, id=subject_id)
            chapter = get_object_or_404(subject.chapters, id=chapter_id)
            return chapter.questions.get(id=question_id)
        except Question.DoesNotExist:
            return None

    def get(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        question = self.get_object(subject_id, chapter_id, question_id)
        if not question:
            return Response(
                {"detail": "Question does not exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = QuestionSerializer(question)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        question = self.get_object(subject_id, chapter_id, question_id)
        if not question:
            return Response(
                {"detail": "Question does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = QuestionSerializer(question, data=request.data, partial=True)
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
    permission_classes = (IsAuthenticated, IsVerified, ChapterAccessPermission)

    def get(self, request, subject_id, *args, **kwargs):
        chapters = Chapter.objects.filter(subject=subject_id)
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, *args, **kwargs):
        subject = get_object_or_404(Subject, id=subject_id)
        payload = request.data.copy()
        payload["subject"] = subject_id
        serializer = ChapterSerializer(data=payload)
        if serializer.is_valid():
            serializer.save(subject=subject)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChapterDetailApiView(APIView):
    """
    Shows details of a chapter.
    """
    permission_classes = (IsAuthenticated, IsVerified, ChapterAccessPermission)

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
        serializer = ChapterSerializer(chapter)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, subject_id, chapter_id, *args, **kwargs):
        chapter = self.get_object(subject_id, chapter_id)
        if not chapter:
            return Response(
                {"detail": "Chapter does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ChapterSerializer(chapter, data=request.data, partial=True)
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
    permission_classes = (IsAuthenticated, IsVerified, SubjectListAccessPermission)

    def get(self, request, *args, **kwargs):
        # If user searching for subject return searched result
        search_subject = request.GET.get("search")
        if search_subject:
            subjects = Subject.objects.filter(
                Q(code_no__icontains=search_subject) or
                Q(title__icontains=search_subject) or
                Q(description__icontains=search_subject))
        else:
            # If not searched return default subjects
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
    permission_classes = (IsAuthenticated, IsVerified, SubjectDetailAccessPermission)

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
