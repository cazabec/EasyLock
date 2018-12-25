from django.db import models

from accounts.models import User


def upload_to(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)


class Picture(models.Model):
    image = models.ImageField(upload_to=upload_to)
    user = models.ForeignKey(User)
