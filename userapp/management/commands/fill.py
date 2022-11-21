from django.core.management.base import BaseCommand
from userapp.models import User
from todoapp.models import Todo, Project


class Command(BaseCommand):

    def handle(self, *args, **options):

        User.objects.all().delete()
        Todo.objects.all().delete()
        Project.objects.all().delete()

        user_1 = User.objects.create_superuser(username='superuser', firstname='Harry', lastname='Potter',
                                               email='h.potter@hogwarts.uk')
        user_2 = User.objects.create(username='bloody_user', firstname='Ron', lastname='Weasley',
                                     email='r.weasley@hogwarts.uk')
        user_3 = User.objects.create(username='expelled_user', firstname='Hermione', lastname='Granger',
                                     email='h.granger@hogwarts.uk')

        user_1.save()
        user_2.save()
        user_3.save()

        project_1 = Project.objects.create(name='Get expelled', link='...')
        project_2 = Project.objects.create(name='Save Sirius', link='...')
        project_3 = Project.objects.create(name='Get married', link='...')

        project_1.save()
        project_2.save()
        project_3.save()

        project_1.users.add(user_1.id, user_2.id)
        project_2.users.add(user_1.id, user_3.id)
        project_3.users.add(user_2.id, user_3.id)

        Todo.objects.create(project=project_1, text='Steal fathers car', user=user_2, status=False)
        Todo.objects.create(project=project_1, text='Crash into a tree', user=user_2, status=False)
        Todo.objects.create(project=project_1, text='Get expelled', user=user_1)

        Todo.objects.create(project=project_2, text='Fail to save Sirius', user=user_1, status=False)
        Todo.objects.create(project=project_2, text='Use a time-turner to save Sirius', user=user_3,
                            status=False)
        Todo.objects.create(project=project_2, text='Sirius does not die one year later', user=user_1)

        Todo.objects.create(project=project_3, text='Date another girl', user=user_2, status=False)
        Todo.objects.create(project=project_3, text='That girl die', user=user_3, status=False)
        Todo.objects.create(project=project_3, text='Date each other', user=user_3, status=False)


