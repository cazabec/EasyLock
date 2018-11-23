from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from rights.models import Right
from accounts.tests.test_accounts import get_basic_auth_header

from accounts.tests.test_accounts import UserFactory
from easylock.factories import RightFactory


class LockTests(APITestCase):

    def setUp(self):
        # Create a first user
        user = UserFactory.create(email='test@mydomain.com')
        user.set_password('test')
        user.save()

        # Create a second one
        user2 = UserFactory.create(email='test2@mydomain.com')
        user2.set_password('test')
        user2.save()

        RightFactory.create_batch(5, user=user)
        RightFactory.create_batch(2, user=user2)
        RightFactory.create(user=user, right=Right.GUEST)

    def login(self, email, password):
        url = reverse('accounts:login')
        self.client.credentials(
            HTTP_AUTHORIZATION=get_basic_auth_header(
                email, password))
        response = self.client.post(url, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(
            HTTP_AUTHORIZATION='Token {}'.format(response.data['token']))

    def test_lock_count_for_first_user(self):
        self.login('test@mydomain.com', 'test')
        response = self.client.get('/api/v1/lock/')
        self.assertEqual(response.data['count'], 6)

    def test_lock_count_for_second_user(self):
        self.login('test2@mydomain.com', 'test')
        response = self.client.get('/api/v1/lock/')
        self.assertEqual(response.data['count'], 2)
