from django_extensions.db.models import TimeStampedModel
from django.db import models


class File(TimeStampedModel):
    class ExtensionChoices(models.TextChoices):
        TXT = "txt", "TXT"
        PDF = "pdf", "PDF"
        MD = "md", "markdown"
        # TODO add more supported extensions

    name = models.CharField(max_length=255,
                            blank=False,
                            null=False)
    file_type = models.CharField(max_length=255,
                                 choices=ExtensionChoices.choices,
                                 blank=False,
                                 null=False)
    content = models.BinaryField()
