from django.urls import re_path

from messenger_app import consumers

websocket_urlpatterns = [
    re_path(r'ws/message/(?P<room_name>\w+)/$', consumers.ChatConsumer),
]
