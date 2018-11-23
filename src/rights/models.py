from django.db import models

from accounts.models import User
from lock.models import Lock


class Right(models.Model):
    # rights
    OWNER = 'OWNER'
    GUEST = 'GUEST'
    RIGHTS_CHOICES = (
        (OWNER, 'owner'),
        (GUEST, 'guest'),
    )

    right = models.CharField(
        max_length=5, choices=RIGHTS_CHOICES, default=GUEST)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lock = models.ForeignKey(Lock, on_delete=models.CASCADE)
    expiration = models.DateTimeField(blank=True, null=True)

    class Meta:
        unique_together = ("right", "user", "lock")
