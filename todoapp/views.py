from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectModelSerializer, TodoModelSerializer
from .models import Project, Todo


class ProjectModelViewSet(ModelViewSet):

    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):

    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
