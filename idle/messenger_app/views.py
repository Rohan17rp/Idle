from django.shortcuts import render
from messenger_app import models
# Create your views here.

def index(request):
    return render(request, 'messenger_app/index.html')

def chat_page_view(request):
    return render(request, 'messenger_app/chat_page.html')

    