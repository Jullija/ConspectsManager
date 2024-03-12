from django_extensions.db.models import TimeStampedModel
from django.db import models

class Subject(TimeStampedModel):
    name = models.CharField(max_length=255)