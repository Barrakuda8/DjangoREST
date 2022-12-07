from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from .serializers import ProjectModelSerializer, TodoModelSerializer, TodoModelSerializerBase
from .models import Project, Todo
from .filters import ProjectFilter, TodoFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):

    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter
    permission_classes = [IsAuthenticated]


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):

    queryset = Todo.objects.all()
    pagination_class = TodoLimitOffsetPagination
    filterset_class = TodoFilter
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        Todo.objects.get(self.kwargs['name']).status = False

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TodoModelSerializer
        return TodoModelSerializerBase

