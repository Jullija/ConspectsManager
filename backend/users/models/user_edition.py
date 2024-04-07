from django.db import models
from users.models.user import User
from conspects.models.edition import Edition


class PermissionType(models.TextChoices):
    VIEW = 'view', 'View'
    EDIT = 'edit', 'Edit'
    OWNS = 'owns', 'Owns'


class UserEdition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='edition_permissions')
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE, related_name='user_permissions')
    permission_type = models.CharField(max_length=4, choices=PermissionType.choices)

    class Meta:
        unique_together = (('user', 'edition', 'permission_type'),)
        verbose_name = 'User Edition'

    def __str__(self):
        return f"{self.user} has {self.permission_type} permission for {self.edition}"
