from django.urls import path

from .views import (
    SubjectListApiView,
    SubjectDetailApiView,
    ChapterListApiView,
    ChapterDetailApiView,
    QuestionListApiView,
    QuestionDetailApiView,
    TestApiView
)

urlpatterns = [
    path("", SubjectListApiView.as_view(), name="subject-list"),
    path("<int:subject_id>/", SubjectDetailApiView.as_view(), name="subject-details"),
    path("<int:subject_id>/chapters/", ChapterListApiView.as_view(), name="chapter-list"),
    path("<int:subject_id>/chapters/<int:chapter_id>/", ChapterDetailApiView.as_view(), name="chapter-details"),
    path("<int:subject_id>/chapters/<int:chapter_id>/questions/", QuestionListApiView.as_view(), name="question-list"),
    path("<int:subject_id>/chapters/<int:chapter_id>/questions/<int:question_id>/",
         QuestionDetailApiView.as_view(), name="question-detail"),
    path("<int:subject_id>/chapters/<int:chapter_id>/questions/<int:question_id>/test/",
         TestApiView.as_view(), name="question-detail"),
]
