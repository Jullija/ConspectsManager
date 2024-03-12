from django.db import models
from django_extensions.db.models import TimeStampedModel

from conspects.models.edition import Edition
from users.models.user import User


class UserEdition(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} | {self.edition}"
