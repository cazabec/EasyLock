from django.db import models
import uuid

from accounts.models import User

class Lock(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
	name = models.CharField(default='My Lock', max_length=50)
	description = models.TextField(default='A description would be better')
	owner = models.ForeignKey(User, related_name='%(class)s_owner', blank=True, on_delete=models.CASCADE, null=True)
	members = models.ForeignKey(User, related_name='%(class)s_members', blank=True, on_delete=models.CASCADE, null=True)