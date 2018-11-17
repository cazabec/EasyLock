from django.db import models
import uuid


class Lock(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4,
        editable=False, unique=True)
    name = models.CharField(default='My Lock', max_length=50)
    description = models.TextField(default='A description would be better')
