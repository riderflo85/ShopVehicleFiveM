from django.db import models


class Vehicle(models.Model):
    name = models.CharField(max_length=150)
    category = models.CharField(max_length=150)
    price = models.IntegerField(null=False)

class Category(models.Model):
    name = models.CharField(max_length=150)
    label = models.CharField(max_length=150)

