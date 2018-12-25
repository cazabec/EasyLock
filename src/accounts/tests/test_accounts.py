import base64

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from easylock.factories import UserFactory


def get_basic_auth_header(username, password):
    return 'Basic %s' % base64.b64encode(
        ('%s:%s' % (username, password)).encode('ascii')).decode()


class AccountTests(APITestCase):

    def setUp(self):
        self.user = UserFactory.create(email='test@mydomain.com',
                                       first_name='Test',
                                       last_name='User')
        self.user.set_password('test')
        self.user.save()

        UserFactory.create(email='test2@mydomain.com')

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

    def test_account_login_unsuccessful(self):
        self.client.credentials(
            HTTP_AUTHORIZATION=get_basic_auth_header(
                'test@mydomain.com', 'wrong'))
        response = self.client.post(reverse('accounts:login'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_account_register_successful(self):
        url = reverse('accounts:register')
        data = {
            'email': 'success@mydomain.com',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm user can login after register
        self.login('success@mydomain.com', 'test')

    def test_account_register_email_already_exists(self):
        url = reverse('accounts:register')
        data = {
            'email': 'success@mydomain.com',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm user can login after register
        self.login('success@mydomain.com', 'test')

        url = reverse('accounts:register')
        data = {
            'email': 'success@mydomain.com',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data['email'],
            ['Email already in use, please use a different email address.'])

    def test_account_login_successful_and_perform_actions(self):
        # Ensure we can login with given credentials.
        self.login('test@mydomain.com', 'test')

        # user confirmed account unsuccessfully
        url = reverse('accounts:status')
        response = self.client.get(url)
        self.assertEqual(response.data['status'], False)

    def test_account_list(self):
        self.login('test@mydomain.com', 'test')
        response = self.client.get('/api/v1/accounts/')
        self.assertEqual(response.data['count'], 2)
