import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Todo, Project
from userapp.models import User


class UserType(DjangoObjectType):

    class Meta:
        model = User
        fields = '__all__'


class TodoType(DjangoObjectType):

    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):

    all_users = graphene.List(UserType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    user_by_username = graphene.Field(UserType, username=graphene.String(required=True))
    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    project_by_name = graphene.Field(ProjectType, name=graphene.String(required=True))
    projects_by_user_id = graphene.List(ProjectType, user_id=graphene.Int(required=True))
    all_todos = graphene.List(TodoType)
    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))
    todos_by_project_id = graphene.List(TodoType, project_id=graphene.Int(required=True))
    todos_by_user_id = graphene.List(TodoType, user_id=graphene.Int(required=True))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_user_by_username(root, info, username):
        return User.objects.get(username=username)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_project_by_id(root, info, id):
        return Project.objects.get(id=id)

    def resolve_project_by_name(root, info, name):
        return Project.objects.get(name=name)

    def resolve_projects_by_user_id(root, info, user_id):
        return Project.objects.filter(users__id__contains=user_id)

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_todo_by_id(root, info, id):
        return Todo.objects.get(id=id)

    def resolve_todos_by_project_id(root, info, project_id):
        return Todo.objects.filter(project__id=project_id)

    def resolve_todos_by_user_id(root, info, user_id):
        return Todo.objects.filter(user__id=user_id)


schema = graphene.Schema(query=Query)
