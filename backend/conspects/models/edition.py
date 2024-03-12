from django_extensions.db.models import TimeStampedModel
from django.db import models


class Edition(TimeStampedModel):
    parent_subject = models.ForeignKey(
        'Subject',
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )
    year = models.IntegerField(null=False, blank=False)
    name = models.CharField(max_length=255, null=False, blank=False)
