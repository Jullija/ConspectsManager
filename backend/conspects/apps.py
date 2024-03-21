from django.apps import AppConfig


class ConspectsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "conspects"

    def ready(self):
        from . import signals