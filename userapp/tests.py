from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APITestCase, APIClient, APISimpleTestCase, APIRequestFactory, force_authenticate
from mixer.backend.django import mixer
from .views import UserModelViewSet
from .models import User
from todoapp.views import TodoModelViewSet, ProjectModelViewSet
from todoapp.models import Todo, Project


class TestUserModelViewSet(TestCase):

    def test_guest_get_users(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_get_users(self):
        factory = APIRequestFactory()
        admin = User.objects.create_superuser(username='superuser', firstname='Harry', lastname='Potter',
                                              email='h.potter@hogwarts.uk', password='12345')
        request = factory.get('/api/users/')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectModelViewSet(TestCase):

    def test_guest_edit_project(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', {'name': 'Name'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_admin_edit_project(self):
    #     project = mixer.blend(Project)
    #     admin = User.objects.create_superuser(username='superuser', firstname='Harry', lastname='Potter',
    #                                           email='h.potter@hogwarts.uk', password='12345')
    #     client = APIClient()
    #     client.login(username='superuser', password='12345')
    #     response = client.put(f'/api/projects/{project.id}/', {'name': 'Name'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     project = Project.objects.get(id=project.id)
    #     self.assertEqual(project.name, 'Name')
    #     client.logout()


class TestTodoModelViewSer(TestCase):

    def test_guest_edit_todo(self):
        todo = mixer.blend(Todo)
        response = self.client.put(f'/api/todos/{todo.id}/', {'text': 'Hello'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_admin_edit_todo(self):
    #     todo = mixer.blend(Todo)
    #     admin = User.objects.create_superuser(username='superuser', firstname='Harry', lastname='Potter',
    #                                           email='h.potter@hogwarts.uk', password='12345')
    #     self.client.login(username='superuser', password='12345')
    #     response = self.client.put(f'/api/todos/{todo.id}/', {'text': 'Hello'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     todo = Todo.objects.get(id=todo.id)
    #     self.assertEqual(todo.text, 'Hello')
    #     self.client.logout()


