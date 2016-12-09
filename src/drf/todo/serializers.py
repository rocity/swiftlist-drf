from .models import *

from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):
    """docstring for ItemSerializer"""
    class Meta:
        model = Item
        fields = ('item_list', 'id', 'text', 'done',)

class ListSerializer(serializers.ModelSerializer):
    """docstring for ListSerializer"""
    items = ItemSerializer(many=True)

    class Meta:
        model = List
        fields = '__all__'