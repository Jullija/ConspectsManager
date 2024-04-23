from django.apps import AppConfig
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate('./resources/firebase_key.json')
firebase_admin.initialize_app(cred)


class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "users"

    def ready(self):
        import users.signals
