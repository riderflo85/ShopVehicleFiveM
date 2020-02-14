from django.shortcuts import render
from .models import Vehicle


def index(request):
    context = {}

    all_vehicle = Vehicle.objects.all()
    context["vehicles"] = all_vehicle

    return render(request, 'graphical_menu/index.html', context)

