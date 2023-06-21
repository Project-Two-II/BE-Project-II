from django.urls import path

from .views import SubmissionAPIView, ResultAPIView, CommentAPIView

app_name = "submission"

urlpatterns = [
    path("", SubmissionAPIView.as_view(), name="submission"),
    path("result/", ResultAPIView.as_view(), name="result"),
    path("comments/", CommentAPIView.as_view(), name="comments")
]
