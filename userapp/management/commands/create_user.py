from django.core.management.base import BaseCommand
from userapp.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        User.objects.create_superuser(username='superuser', firstname='Harry', lastname='Potter',
                                      email='h.potter@hogwarts.uk')
        User.objects.create(username='bloody_user', firstname='Ron', lastname='Weasley',
                            email='r.weasley@hogwarts.uk')
        User.objects.create(username='expelled_user', firstname='Hermione', lastname='Granger',
                            email='h.granger@hogwarts.uk')
