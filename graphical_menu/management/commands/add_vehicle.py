import os
import json
from django.core.management.base import BaseCommand
from graphical_menu.models import Vehicle


class Command(BaseCommand):
    """
    Add manage.py command
    The new command takes the name of the file
    """

    help = "Ajout de plusieurs plats dans la base de données"

    def handle(self, *args, **options):
        # ---------- select .json file --------------- #
        directory = os.path.dirname(__file__)
        json_file = os.path.join(directory, "../..", "vehicle.json")
        # -------------------------------------------- #

        try:
            with open(json_file, 'r') as file:
                data = json.load(file)

                for i in data['cars']:
                    Vehicle(
                        name=i['name'],
                        model=i['label'],
                        price=i['price'],
                        category=i['category'],
                        imglink=i['imglink']
                    ).save()
                    # print(i['label'])

                    self.stdout.write(
                        f"{self.style.SUCCESS(i['name'])} ajouté à la base de données"
                    )

            self.stdout.write(self.style.SUCCESS('Les véhicules ont correctement \
été ajoutés dans la base de données'))

        except:
            self.stderr.write(self.style.ERROR('Une erreur est survenu.'))
#         with open(json_file, 'r') as file:
#             data = json.load(file)

#             for i in data['cars']:
#                 Vehicle(
#                     name=i['name'],
#                     model=i['label'],
#                     price=i['price'],
#                     category=i['category'],
#                     imglink=i['imglink']
#                 ).save()
#                 # print(i['label'])

#                 self.stdout.write(
#                     f"{self.style.SUCCESS(i['name'])} ajouté à la base de données"
#                 )

#         self.stdout.write(self.style.SUCCESS('Les véhicules ont correctement \
# été ajoutés dans la base de données'))