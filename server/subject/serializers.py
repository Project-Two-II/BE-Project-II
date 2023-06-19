from rest_framework import serializers

from .models import (
    Subject,
    Chapter,
    Question,
    Test
)


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    # test = TestSerializer(read_only=True)

    class Meta:
        model = Question
        fields = "__all__"


class ChapterSerializer(serializers.ModelSerializer):
    # questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = "__all__"


class SubjectSerializer(serializers.ModelSerializer):
    # chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = "__all__"
