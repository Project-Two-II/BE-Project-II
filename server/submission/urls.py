from django.urls import path

from .views import SubmissionAPIView, ResultAPIView, ReviewListCreateAPIView, ReviewRetrieveUpdateDestroyAPIView

app_name = "submission"

urlpatterns = [
    path("", SubmissionAPIView.as_view(), name="submission"),
    path("result/", ResultAPIView.as_view(), name="result"),
    path("review/", ReviewListCreateAPIView.as_view(), name="review-list"),
    path("review/<int:review_id>", ReviewRetrieveUpdateDestroyAPIView.as_view(), name="review-detail")
]
