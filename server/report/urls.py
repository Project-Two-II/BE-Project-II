from django.urls import path
from .views import StudentListInASubjectAPIView

app_name = "report"

urlpatterns = [
    path("subjects/<int:subject_id>",
         StudentListInASubjectAPIView.as_view(), name="student-list-in-a-subject"),
]
