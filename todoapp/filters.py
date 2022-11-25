from django_filters import rest_framework
from .models import Todo, Project


class TodoFilter(rest_framework.FilterSet):

    created_after = rest_framework.DateTimeFilter(field_name='created_at', lookup_expr='gt', label='Created after')
    created_before = rest_framework.DateTimeFilter(field_name='created_at', lookup_expr='lt', label='Created before')

    created_range = rest_framework.RangeFilter(field_name='created_at', label='Created between')

    class Meta:
        model = Todo
        fields = ['project', 'created_after', 'created_before', 'created_range']


class ProjectFilter(rest_framework.FilterSet):

    name = rest_framework.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']
