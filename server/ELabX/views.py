from django.http import JsonResponse


def home(request):
    return JsonResponse({"msg": "This is an API homepage for ELabX!"})
