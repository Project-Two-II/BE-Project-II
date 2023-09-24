from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from subject.models import Chapter, Question, Subject
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

    # def get(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
    #     chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
    #     question = Question.objects.get(id=question_id, chapter=chapter.id)
    #     submissions = Submission.objects.get(question=question.id)
    #     serializer = SubmissionSerializer(submissions, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, subject_id, chapter_id, question_id, *args, **kwargs):
        data = request.data.copy()
        # Validate and check if the question exists,
        # if yes assign this submission to this question by requested user
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(subject.chapters, id=chapter_id)
        question = get_object_or_404(chapter.questions, id=question_id)

        # assign question and user
        data["question"] = question.id
        data["submitted_by"] = request.user.id

        serializer = SubmissionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResultAPIView(APIView):
    permission_classes = (IsAuthenticated, IsVerified, ResultAccessPermission)

    # def get(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
    #     chapter = Chapter.objects.get(id=chapter_id, subject=subject_id)
    #     question = Question.objects.get(id=question_id, chapter=chapter.id)
    #     submission = Submission.objects.get(question=question.id, id=submission_id)
    #     result = Result.objects.get(submission=submission.id)
    #     serializer = ResultSerializer(result)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def get_submission(self, subject_id, chapter_id, question_id, submission_id):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(subject.chapters, id=chapter_id)
        question = get_object_or_404(chapter.questions, id=question_id)
        try:
            submission = Submission.objects.get(question=question.id, id=submission_id)
            return submission
        except Submission.DoesNotExist:
            return Response({"detail": "Submission not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        payload = request.data.copy()
        submission = self.get_submission(subject_id, chapter_id, question_id, submission_id)
        payload["submission"] = submission.id

        serializer = ResultSerializer(data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        payload = request.data.copy()
        submission = self.get_submission(subject_id, chapter_id, question_id, submission_id)
        result = get_object_or_404(Result, submission=submission.id)
        payload["submission"] = submission.id

        serializer = ResultSerializer(result, data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        submission = self.get_submission(subject_id, chapter_id, question_id, submission_id)
        result = get_object_or_404(Result, submission=submission.id)
        result.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
