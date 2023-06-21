from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404

from .models import Submission, Result, Comment
from .serializers import (
    SubmissionSerializer,
    ResultSerializer,
    CommentSerializer
)


class SubmissionAPIView(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "detail": "Not developed Yet."
        }
        return Response(data, status=status.HTTP_200_OK)


class ResultAPIView(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "detail": "Not developed Yet."
        }
        return Response(data, status=status.HTTP_200_OK)


class CommentAPIView(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "detail": "Not developed Yet."
        }
        return Response(data, status=status.HTTP_200_OK)
