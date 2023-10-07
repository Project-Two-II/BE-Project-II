from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from subject.models import Chapter, Question, Subject, ChapterProgress
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
        user = self.request.user
        chapter_progress = ChapterProgress.objects.filter(user=user, chapter=chapter).first()
        if not (chapter_progress and not chapter_progress.is_locked):
            return Response(
                {"detail": "Please complete the previous chapter before accessing this one."},
                status=status.HTTP_403_FORBIDDEN
            )
        question = get_object_or_404(chapter.questions, id=question_id)

        # assign question and user
        data["question"] = question.id
        data["submitted_by"] = user.id

        print(chapter.questions.filter(submission__submitted_by=user).count())
        print(chapter.questions.count())

        serializer = SubmissionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            if chapter.questions.filter(submission__submitted_by=user).count() == chapter.questions.count():
                next_chapter = chapter.get_next_chapter()
                if next_chapter:
                    next_chapter.unlock_for_user(user)
                    return Response(
                        {"detail": "Submission accepted. Next chapter unlocked."},
                        status=status.HTTP_201_CREATED
                    )
                else:
                    return Response(
                        {"detail": "Congratulations! You have completed the subject."},
                        status=status.HTTP_201_CREATED
                    )
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


class ReviewAPIView(APIView):
    permission_classes = (IsAuthenticated, IsVerified, ReviewAccessPermission)

    def get_submission(self, subject_id, chapter_id, question_id, submission_id):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(subject.chapters, id=chapter_id)
        question = get_object_or_404(chapter.questions, id=question_id)
        try:
            submission = Submission.objects.get(question=question.id, id=submission_id)
            return submission
        except Submission.DoesNotExist:
            return Response({"detail": "Submission not found."}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        submission = self.get_submission(subject_id, chapter_id, question_id, submission_id)
        review = Review.objects.get(submission=submission.id)
        if (request.user.is_student() and (submission.submitted_by == request.user)) or request.user.is_teacher():
            serializer = ReviewSerializer(review)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            data={"detail": "You do not have permission to access it."},
            status=status.HTTP_400_BAD_REQUEST
        )

    def post(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        payload = request.data.copy()
        submission = self.get_submission(subject_id, chapter_id, question_id, submission_id)
        payload["submission"] = submission.id
        payload["reviewed_by"] = self.request.user.id

        serializer = ReviewSerializer(data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        payload = request.data.copy()
        submission = self.get_submission(subject_id, chapter_id, question_id, submission_id)
        review = get_object_or_404(Review, submission=submission.id)
        payload["submission"] = submission.id
        payload["reviewed_by"] = self.request.user.id

        serializer = ReviewSerializer(review, data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, subject_id, chapter_id, question_id, submission_id, *args, **kwargs):
        submission = self.get_submission(subject_id, chapter_id, question_id, submission_id)
        review = get_object_or_404(Review, submission=submission.id)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
