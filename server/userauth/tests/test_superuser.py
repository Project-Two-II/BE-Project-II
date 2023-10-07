from django.urls import reverse
from django.test import TestCase


class SuperuserTestCase(TestCase):
    def setUp(self) -> None:
        self.admin_url = reverse("admin:login")

    def test_can_access_login(self):
        data = {
            "username": "admin@elabx.com",
            "password": "elabx_password"
        }
        response = self.client.get(self.admin_url)
        self.assertEqual(response.status_code, 200)
