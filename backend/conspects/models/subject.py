from django.db import models
from django_extensions.db.models import TimeStampedModel


class Subject(TimeStampedModel):
    name = models.CharField(max_length=255)
