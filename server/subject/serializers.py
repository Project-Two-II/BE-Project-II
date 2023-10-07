from rest_framework import serializers

from .models import (
    Subject,
    Chapter,
    Question,
    Test,
    SubjectGroup,
    SubjectEnrollment,
)


class SubjectEnrollmentSerializer(serializers.ModelSerializer):
    """
    Serializer class for SubjectEnrollment model
    """

    class Meta:
        model = SubjectEnrollment
        fields = "__all__"


class SubjectGroupSerializer(serializers.ModelSerializer):
    """
    Serializer class for SubjectGroup model
    """
    class Meta:
        model = SubjectGroup
        fields = "__all__"


class TestSerializer(serializers.ModelSerializer):
    """
    Serializer for Test of a Question
    """
    class Meta:
        model = Test
        fields = ["source_code", "question"]


class QuestionSerializer(serializers.ModelSerializer):
    """
    Serializer for Question model
    """

    class Meta:
        model = Question
        fields = "__all__"


class ChapterSerializer(serializers.ModelSerializer):
    """
    Serializer for Chapter
    """

    class Meta:
        model = Chapter
        fields = "__all__"


class SubjectSerializer(serializers.ModelSerializer):
    """
    Serializer class for Subject model
    """

    class Meta:
        model = Subject
        fields = "__all__"
