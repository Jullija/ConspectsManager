from django.db import models
from django_extensions.db.models import TimeStampedModel


class User(TimeStampedModel):

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    uid = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.name}"

