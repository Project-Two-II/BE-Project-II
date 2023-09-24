from django.urls import path

from .views import SubmissionAPIView, ResultAPIView, ReviewListCreateAPIView, ReviewRetrieveUpdateDestroyAPIView

app_name = "submission"

urlpatterns = [
    path("<int:subject_id>/<int:chapter_id>/<int:question_id>/submit/",
         SubmissionAPIView.as_view(), name="submission"),
    path("<int:subject_id>/<int:chapter_id>/<int:question_id>/<int:submission_id>/result/",
         ResultAPIView.as_view(), name="result"),
    path("<int:subject_id>/<int:chapter_id>/<int:question_id>/<int:submission_id>/review/",
         ReviewListCreateAPIView.as_view(), name="review-list"),
    path("<int:subject_id>/<int:chapter_id>/"
         "<int:question_id>/<int:submission_id>/review/<int:review_id>/",
         ReviewRetrieveUpdateDestroyAPIView.as_view(), name="review-detail")
]
