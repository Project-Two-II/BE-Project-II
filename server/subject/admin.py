from django.contrib import admin

from .models import Subject, Chapter, Question, Test, SubjectGroup, SubjectEnrollment

# Register your models here.

admin.site.register(Subject)
admin.site.register(Chapter)
admin.site.register(Question)
admin.site.register(Test)
admin.site.register(SubjectGroup)
admin.site.register(SubjectEnrollment)
