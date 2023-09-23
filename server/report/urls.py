from django.urls import path
from .views import StudentListInASubjectAPIView, StudentReportInASubjectAPIView

app_name = "report"

urlpatterns = [
    path("subjects/<int:subject_id>/students/",
         StudentListInASubjectAPIView.as_view(), name="student-list-in-a-subject"),
    path("subjects/<int:subject_id>/students/<int:user_id>/",
         StudentReportInASubjectAPIView.as_view(), name="student-report-in-a-subject")
]
