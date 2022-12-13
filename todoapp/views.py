from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from .serializers import ProjectModelSerializer, TodoModelSerializer, TodoModelSerializerBase
from .models import Project, Todo
from .filters import ProjectFilter, TodoFilter
from rest_framework.response import Response
from rest_framework import status


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
        todo = Todo.objects.get(id=self.kwargs['pk'])
        todo.status = False
        todo.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TodoModelSerializer
        return TodoModelSerializerBase

