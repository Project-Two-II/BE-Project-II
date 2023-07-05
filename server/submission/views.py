from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from subject.models import Chapter, Question
from subject.permissions import SubjectDetailAccessPermission
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
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get(self, request, *args, **kwargs):
        submissions = Submission.objects.all()
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        # If data are send in JSON payload
        subject_id = data.pop("subject", None)
        chapter_id = data.pop("chapter", None)
        question_id = data.pop("question", None)

        # Validate and check if the question exists,
        # if yes assign this submission to this question by requested user
        try:
            chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
            question = Question.objects.get(id=question_id, chapter=chapter.id)
        except Chapter.DoesNotExist or Question.DoesNotExist:
            return Response({"error": "Invalid Subject, Chapter or Question"}, status=status.HTTP_400_BAD_REQUEST)

        # assign question and user
        data["question"] = question.id
        data["submitted_by"] = request.user.id

        serializer = SubmissionSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResultAPIView(APIView):
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)

    def get(self, request, *args, **kwargs):
        results = Result.objects.all()
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()

        submission_id = data.pop("submission", None)
        try:
            submission = Submission.objects.get(id=submission_id)
        except Result.DoesNotExist:
            return Response({"error": "Invalid Submission or Result"}, status=status.HTTP_400_BAD_REQUEST)

        data["submission"] = submission.id

        serializer = SubmissionSerializer(data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewListCreateAPIView(ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)


class ReviewRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated, SubjectDetailAccessPermission)
