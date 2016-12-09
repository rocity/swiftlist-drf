from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from todo.api import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'list', ListViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^$', ListViewSet.as_view({
        'get': 'list'
        }), name="lists"),
    url(r'^list/(?P<list_id>[0-9]+)/$', ListDetailViewSet.as_view({
        'get': 'detail'
        }), name="list_detail"),
    url(r'^item/(?P<item_id>[0-9]+)/$', ItemViewSet.as_view({
        'put': 'update'
        }), name="item"),
    url(r'^item/$', ItemViewSet.as_view({
        'post': 'create'
        }), name="items"),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]