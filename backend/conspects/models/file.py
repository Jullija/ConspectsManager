from django.db import models
from django_extensions.db.models import TimeStampedModel


class File(TimeStampedModel):
    name = models.CharField(max_length=255,
                            blank=False,
                            null=False)
    file_type = models.CharField(max_length=255,
                                 blank=False,
                                 null=False)
    content = models.BinaryField()
