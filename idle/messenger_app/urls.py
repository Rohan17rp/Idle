from django.urls import path
from messenger_app import views

urlpatterns = [
    path('<str:room_name>/', views.chat_page_view, name='room'),
]