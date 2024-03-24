from django.db import models


class Course(models.Model):
    name = models.CharField(max_length=255, unique=True, blank=False, null=False)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"
