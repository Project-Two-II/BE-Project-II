from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class EmailBackend(ModelBackend):
    def authenticate(self, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            # print(UserModel.objects.all())
            user = UserModel.objects.get(email=email)
            # print("user = ", user)
            # print(user.password)
            # print(user.check_password(password))
        except UserModel.DoesNotExist:
            return None
        else:
            # print(password)
            if user.check_password(password):
                # print("after check password", user)
                return user
        return None
