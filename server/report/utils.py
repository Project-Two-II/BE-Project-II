from subject.models import Chapter, Question
from submission.models import Submission


class ProgressGenerator:
    @staticmethod
    def get_question_report(user, question):
        question_report = dict()
        question_report["question_name"] = question.title
        question_report["status"] = Submission.objects.filter(question=question, submitted_by__email=user).exists()
        question_report["marks"] = 45

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
