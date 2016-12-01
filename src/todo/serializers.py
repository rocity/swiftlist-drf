from .models import *

from rest_framework import serializers

class ListSerializer(serializers.ModelSerializer):
    """docstring for ListSerializer"""
    queryset = List.objects.all()

    class Meta:
        model = List
        fields = '__all__'
