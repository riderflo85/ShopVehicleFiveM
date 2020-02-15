from django.shortcuts import render
from django.http import JsonResponse
from django.core.serializers import serialize
from .models import Vehicle


def index(request):
    if request.method == 'POST':
        if request.POST['listing'] == "okay":
            return JsonResponse({"cars": serialize('json', Vehicle.objects.all())})

    else:
        return render(request, 'graphical_menu/index.html')

