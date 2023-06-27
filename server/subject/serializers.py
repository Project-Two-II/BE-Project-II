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
    """
    Display all the fields, if the request method is GET
    For POST and PUT there are only certain fields
    """
    # chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = "__all__"

    def get_fields(self, *args, **kwargs):
        fields = self.Meta.fields
        if self.request.method in ["POST", "PUT"]:
            fields = [
                "code_no",
                "title",
                "description",
                "thumbnail",
            ]
        return fields
