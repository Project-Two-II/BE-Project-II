from .setup import SubjectSetup, ChapterSetup, QuestionSetup, TestSetup
from ..models import Subject, Chapter, Question, Test


class SubjectTest(SubjectSetup):
    def test_subject_title(self):
        sub = Subject.objects.get(id=1)
        self.assertEqual(sub.title, "OOP in CPP")


class ChapterTest(ChapterSetup):
    def test_chapter_title(self):
        chapters = Chapter.objects.filter(subject=self.subject)
        self.assertEqual(chapters.count(), 2)

        ch1 = chapters[0]
        ch2 = chapters[1]
        self.assertEqual(str(ch1), "Chapter 1")
        self.assertEqual(str(ch2), "Chapter 2")


class QuestionTest(QuestionSetup):
    def test_question_title(self):
        questions = Question.objects.filter(chapter=self.chapter1)
        self.assertEqual(questions.count(), 2)

        que1 = questions[0]
        que2 = questions[1]
        self.assertEqual(str(que1), "first question of chapter 1")
        self.assertEqual(str(que2), "second question of chapter 1")


class TestTest(TestSetup):
    def test_test_code(self):
        test = Test.objects.get(question=self.question1)
        self.assertEqual(str(test), "Test for first question of chapter 1")
