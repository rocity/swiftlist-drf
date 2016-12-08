# django imports
from django.shortcuts import get_object_or_404

# rest framework imports
import rest_framework.status as status

from rest_framework.viewsets import ViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from todo import models as todo_models
from todo import serializers as todo_serializers

class ListViewSet(ViewSet):
    """Viewset for model List
    """
    queryset = todo_models.List.objects.all()

    def list(self, *args, **kwargs):
        lists = todo_models.List.objects.all()
        serializer = todo_serializers.ListSerializer(lists, many=True)

        return Response(serializer.data)

class ListDetailViewSet(ViewSet):
    """Viewing details for List
    """
    queryset = todo_models.List.objects.all()

    def detail(self, *args, **kwargs):
        """Retrieve a single List object
        """
        list_obj = get_object_or_404(self.queryset, pk=kwargs['list_id'])
        serializer = todo_serializers.ListSerializer(list_obj)
        return Response(serializer.data, status=200)

class ItemViewSet(ViewSet):
    """docstring for ItemViewSet"""
    queryset = todo_models.Item.objects.all()

    def update(self, *args, **kwargs):
        # set item as `done`
        item = get_object_or_404(todo_models.Item, id=kwargs['item_id'])
        item.done = True
        serializer = todo_serializers.ItemSerializer(item, data=item.__dict__)

        if serializer.is_valid():
            instance = serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.data, status=400)