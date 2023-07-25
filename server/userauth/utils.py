from django.core.mail import EmailMessage
from .backends import CustomEmailBackend
from ELabX.settings import EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
from django.core.mail import send_mail


class Util:
    @staticmethod
    def send_mail(data):
        try:
            send_mail(
                subject=data["email_subject"],
                message=data["email_body"],
                from_email=EMAIL_HOST_USER,
                recipient_list=(data["to_email"],),
                fail_silently=False,
            )
            return True
        except Exception as e:
            print("detail", e)
            return False


# class Util:
#     @staticmethod
#     def send_mail(data):
#         # Create an instance of CustomEmailBackend
#         email_backend = CustomEmailBackend(username=EMAIL_HOST_USER, password=EMAIL_HOST_PASSWORD)
#         try:
#             email = EmailMessage(
#                 subject=data["email_subject"],
#                 body=data["email_body"],
#                 from_email=EMAIL_HOST_USER,
#                 to=(data["to_email"],),
#                 connection=email_backend
#             )
#             email.send()
#             return True
#         except Exception as e:
#             print("detail:", e)
#             return False
