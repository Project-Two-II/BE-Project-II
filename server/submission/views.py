from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from subject.models import Chapter, Question
from userauth.permissions import IsVerified
from .permissions import (
    ReviewAccessPermission,
    ResultAccessPermission,
    SubmissionAccessPermission
)
from .models import Submission, Result, Review
from .serializers import (
    SubmissionSerializer,
    ResultSerializer,
    ReviewSerializer
)


class SubmissionAPIView(APIView):
    """
    API endpoint for Solution to a question related activities
    """
    permission_classes = (IsAuthenticated, IsVerified, SubmissionAccessPermission)

    def get(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
        question = Question.objects.get(id=question_id, chapter=chapter.id)
        submissions = Submission.objects.get(question=question.id)
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        data = request.data.copy()
        # Validate and check if the question exists,
        # if yes assign this submission to this question by requested user
        try:
            chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
            question = Question.objects.get(id=question_id, chapter=chapter.id)
        except Chapter.DoesNotExist or Question.DoesNotExist:
            return Response({"detail": "Invalid Subject, Chapter or Question"}, status=status.HTTP_400_BAD_REQUEST)

        # assign question and user
        data["question"] = question.id
        data["submitted_by"] = request.user.id

        serializer = SubmissionSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResultAPIView(APIView):
    permission_classes = (IsAuthenticated, IsVerified, ResultAccessPermission)

    def get(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
        question = Question.objects.get(id=question_id, chapter=chapter.id)
        submission = Submission.objects.get(question=question.id, id=submission_id)
        result = Result.objects.get(submission=submission.id)
        serializer = ResultSerializer(result)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        payload = request.data.copy()
        try:
            chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
            question = Question.objects.get(id=question_id, chapter=chapter.id)
            submission = Submission.objects.get(question=question.id, id=submission_id)
        except Submission.DoesNotExist:
            return Response({"detail": "Invalid Submission or Subject"}, status=status.HTTP_400_BAD_REQUEST)

        payload["submission"] = submission.id

        serializer = ResultSerializer(data=payload, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewListCreateAPIView(APIView):
    permission_classes = (IsAuthenticated, IsVerified, ReviewAccessPermission)

    def get(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
        question = Question.objects.get(id=question_id, chapter=chapter.id)
        submission = Submission.objects.get(question=question.id, id=submission_id)
        review = Review.objects.get(submission=submission.id)
        serializer = ResultSerializer(review)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        payload = request.data.copy()
        try:
            chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
            question = Question.objects.get(id=question_id, chapter=chapter.id)
            submission = Submission.objects.get(id=submission_id, question=question.id)
        except Submission.DoesNotExist or Question.DoesNotExist or Chapter.DoesNotExist:
            return Response({"detail": "Invalid Subject or Chapter or Question or Submission"},
                            status=status.HTTP_400_BAD_REQUEST)

        payload["submission"] = submission.id
        payload["reviewed_by"] = self.request.user.id

        serializer = ReviewSerializer(data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated, IsVerified, ResultAccessPermission)
