import factory

from rights.models import Right
from lock.models import Lock
from accounts.models import User


class UserFactory(factory.DjangoModelFactory):
    first_name = 'John'
    last_name = 'Doe'
    is_active = True

    class Meta:
        model = User
        django_get_or_create = ('email',)


class LockFactory(factory.DjangoModelFactory):
    description = 'A description would be better'

    class Meta:
        model = Lock


class RightFactory(factory.DjangoModelFactory):
    class Meta:
        model = Right
    user = factory.SubFactory(UserFactory)
    lock = factory.SubFactory(LockFactory)
    right = Right.OWNER
