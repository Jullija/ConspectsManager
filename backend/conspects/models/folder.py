from django.db import models
from django_extensions.db.models import TimeStampedModel

from conspects.models.edition import Edition


class Folder(TimeStampedModel):
    name = models.CharField(max_length=255, blank=False, null=False)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE, null=True, blank=True)
