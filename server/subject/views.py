from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404


from .models import Subject, Chapter
from .serializers import SubjectSerializer, ChapterSerializer, QuestionSerializer


class QuestionListApiView(APIView):
    def get(self, request, subject_id, chapter_id, format=None):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(Chapter, id=chapter_id, subject=subject)
        questions = chapter.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class QuestionDetailApiView(APIView):
    def get(self, request, subject_id, chapter_id, question_id, format=None):
        subject = get_object_or_404(Subject, id=subject_id)
        chapter = get_object_or_404(subject.chapters, id=chapter_id)
        question = get_object_or_404(chapter.questions, id=question_id)

        serializer = QuestionSerializer(question)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChapterListApiView(APIView):
    """
    It shows the list of all available chapters
    TODO:
        - only access to authenticated user
        - Student can access only GET request
        - Teacher can access both GET and POST request
    """
    def get(self, request, subject_id, *args, **kwargs):
        chapters = Chapter.objects.filter(subject=subject_id)
        # subject = get_object_or_404(Subject, id=subject_id)
        # chapters = subject.chapters.all()
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChapterDetailApiView(APIView):
    """
    Shows details of a Subject.
    TODO:
        - only access to authenticated user, GET request
        - Add put and delete request
        - Only teacher who create this subject can access PUT, and DELETE request
    """
    def get_object(self, subject_id, chapter_id):
        try:
            return Chapter.objects.get(subject=subject_id, id=chapter_id)
        except Chapter.DoesNotExist:
            return None

    def get(self, request, subject_id, chapter_id, *args, **kwargs):
        chapter_instance = self.get_object(subject_id, chapter_id)
        if not chapter_instance:
            return Response(
                {"res": "Chapter with chapter id does not exists."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = ChapterSerializer(chapter_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubjectListApiView(APIView):
    """
    It shows the list of all available subjects
    TODO:
        - only access to authenticated user
        - Student can access only GET request
        - Teacher can access both GET and POST request
    """
    def get(self, request, *args, **kwargs):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubjectDetailApiView(APIView):
    """
    Shows details of a Subject.
    TODO:
        - only access to authenticated user, GET request
        - Add put and delete request
        - Only teacher who create this subject can access PUT, and DELETE request
    """

    # def get(self, request, subject_id, *args, **kwargs):
    #     subject = get_object_or_404(Subject, id=subject_id)
    #
    #     serializer = SubjectSerializer(subject)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def get_object(self, subject_id):
        try:
            return Subject.objects.get(id=subject_id)
        except Subject.DoesNotExist:
            return None

    def get(self, request, subject_id, *args, **kwargs):
        subject_instance = self.get_object(subject_id)
        if not subject_instance:
            return Response(
                {"res": "Subject with subject id does not exists."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = SubjectSerializer(subject_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
