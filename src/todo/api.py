# rest framework imports
import rest_framework.status as status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.views import APIView

from todo import models as todo_models
from todo import serializers as todo_serializers

class ListViewSet(viewsets.ModelViewSet):
    """docstring for ListViewSet"""
    queryset = todo_models.List.objects.all()
    serializer_class = todo_serializers.ListSerializer

    def get(self, request, *args, **kwargs):

        return Response(status=status.HTTP_200_OK)