from django.urls import path
from .views import StudentListInASubjectAPIView, StudentReportOfAQuestionAPIView

app_name = "report"

urlpatterns = [
    path("subjects/<int:subject_id>/students/",
         StudentListInASubjectAPIView.as_view(), name="student-list-in-a-subject"),
    path("subjects/<int:subject_id>/<int:chapter_id>/<int:question_id>/students/<int:student_id>/",
         StudentReportOfAQuestionAPIView.as_view(), name="student-report-in-a-question")
]
