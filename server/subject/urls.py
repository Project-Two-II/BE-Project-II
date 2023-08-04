from django.urls import path

from .views import (
    SubjectListApiView,
    SubjectDetailApiView,
    ChapterListApiView,
    ChapterDetailApiView,
    QuestionListApiView,
    QuestionDetailApiView,
    TestApiView,
    SubjectGroupAPIView,
    MySubjectAPIView,
    AddEnrollmentKeyAPIView,
    SelfEnrollmentAPIView,
)

app_name = "subject"

urlpatterns = [
    path("",
         SubjectListApiView.as_view(), name="subject-list"),
    path("<int:subject_id>/",
         SubjectDetailApiView.as_view(), name="subject-detail"),
    path("<int:subject_id>/chapters/",
         ChapterListApiView.as_view(), name="chapter-list"),
    path("<int:subject_id>/chapters/<int:chapter_id>/",
         ChapterDetailApiView.as_view(), name="chapter-detail"),
    path("<int:subject_id>/chapters/<int:chapter_id>/questions/",
         QuestionListApiView.as_view(), name="question-list"),
    path("<int:subject_id>/chapters/<int:chapter_id>/questions/<int:question_id>/",
         QuestionDetailApiView.as_view(), name="question-detail"),
    path("<int:subject_id>/chapters/<int:chapter_id>/questions/<int:question_id>/test/",
         TestApiView.as_view(), name="question-test"),
    path("<int:subject_id>/group/",
         SubjectGroupAPIView.as_view(), name="subject-group"),
    path("mysubjects/",
         MySubjectAPIView.as_view(), name="my-subjects"),
    path("<int:subject_id>/add-enrollment-key/",
         AddEnrollmentKeyAPIView.as_view(), name="add-enrollment-key"),
    path("<int:subject_id>/enroll/",
         SelfEnrollmentAPIView.as_view(), name="enroll"),
]
