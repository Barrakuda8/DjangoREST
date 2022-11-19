from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Project, Todo
from userapp.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):

    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):

    user = UserModelSerializer()
    project = ProjectModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'
