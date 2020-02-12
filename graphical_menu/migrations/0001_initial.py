# Generated by Django 3.0.3 on 2020-02-12 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('label', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('model', models.CharField(max_length=150)),
                ('category', models.CharField(max_length=150)),
                ('price', models.IntegerField()),
                ('imglink', models.TextField()),
            ],
        ),
    ]
