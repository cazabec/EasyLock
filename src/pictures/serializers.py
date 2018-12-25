from rest_framework import serializers

from pictures.models import Picture


class PictureSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Picture
        fields = ('image', 'user')
