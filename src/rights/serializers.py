from rest_framework import serializers

from rights.models import Right


class RightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Right
        depth = 0
        fields = '__all__'
