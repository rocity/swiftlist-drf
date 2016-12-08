# rest framework imports
import rest_framework.status as status

from rest_framework.viewsets import ViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.views import APIView

from todo import models as todo_models
from todo import serializers as todo_serializers

class ListViewSet(ViewSet):
    queryset = todo_models.List.objects.all()

    """docstring for ListViewSet"""
    def list(self, *args, **kwargs):
        lists = todo_models.List.objects.all()
        serializer = todo_serializers.ListSerializer(lists, many=True)

        return Response(serializer.data)