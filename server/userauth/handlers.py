from rest_framework.views import exception_handler
from rest_framework.exceptions import MethodNotAllowed, NotAuthenticated
from rest_framework.response import Response


def custom_exception_handler(exc, context):
    if isinstance(exc, MethodNotAllowed) and context["request"].method == "GET":
        return Response({"detail": "GET method is not allowed."},
                        status=exc.status_code)

    if isinstance(exc, NotAuthenticated):
        return Response({"detail": "Authentication credentials were not provided."},
                        status=exc.status_code)

    # For all other exceptions, fallback to the default exception handler
    return exception_handler(exc, context)
