from rest_framework.generics import get_object_or_404

from subject.models import Chapter, Question, SubjectGroup
from submission.models import Submission, Result, Review


class StatsGenerator:
    @staticmethod
    def count_my_subjects(user):
        return SubjectGroup.objects.filter(users=user).count()

    @staticmethod
    def count_my_students(user):
        _users = set()
        groups = SubjectGroup.objects.filter(users=user)
        for group in groups:
            _users.update(group.users.all())
        return len(_users)


class ProgressGenerator:
    @staticmethod
    def get_question_report(user, question):
        question_report = dict()
        question_report["question_name"] = question.title
        try:
            submission = Submission.objects.get(question=question, submitted_by__email=user)
            question_report["status"] = 1
            question_report["solution"] = submission.solution
            try:
                question_report["marks"] = get_object_or_404(Result, submission=submission).marks
            except Exception as e:
                question_report["marks"] = 0
            try:
                question_report["review"] = get_object_or_404(Review, submission=submission).message
            except Exception as e:
                question_report["review"] = ""
        except Exception as e:
            question_report["status"] = 0
            question_report["marks"] = 0
            question_report["solution"] = ""
            question_report["review"] = ""
            return question_report
        return question_report

    @staticmethod
    def get_my_progress(user, subject):
        total_questions = 0
        submitted_questions = 0
        chapters = Chapter.objects.filter(subject=subject)
        for chapter in chapters:
            questions = Question.objects.filter(chapter=chapter)
            total_questions += questions.count()
            for question in questions:
                if Submission.objects.filter(question=question, submitted_by__email=user).exists():
                    submitted_questions += 1
        return (submitted_questions/total_questions) * 100
