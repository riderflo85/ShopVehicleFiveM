from django.shortcuts import render


def index(request):
    return render(request, 'graphical_menu/index.html')

