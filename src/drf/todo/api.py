# rest framework imports
import rest_framework.status as status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.views import APIView

from todo import models as todo_models
from todo import serializers as todo_serializers

class ListViewSet(viewsets.ViewSet):
    """docstring for ListViewSet"""
    def list(self, *args, **kwargs):
        lists = List.objects.all()
        serializer = ListSerializer(lists, many=True)

        return Response(serializer.data, status=200)