from django.db import models
from django.forms import JSONField
from django_extensions.db.models import TimeStampedModel


class Template(TimeStampedModel):
    name = models.CharField(max_length=255)
    content_structure = JSONField()  # idk if this will work
