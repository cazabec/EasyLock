from rest_framework import serializers

from accounts.models import User
from pictures.serializers import PictureSerializer


class UserSerializer(serializers.ModelSerializer):

    profile_picture = PictureSerializer(
            many=True, read_only=True, source='get_profile_picture'
        )

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'profile_picture')


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate_email(self, value):
        """
        Validate if email is valid or there is an user using the email.

        :param value: string
        :return: string
        """

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                'Email already in use, please use a different email address.')

        return value
