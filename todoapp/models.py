from django.db import models
from userapp.models import User


class Project(models.Model):

    name = models.CharField(max_length=128, unique=True, verbose_name='name')
    link = models.CharField(max_length=128, verbose_name='repository link')
    users = models.ManyToManyField(User)


class Todo(models.Model):

    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='project')
    text = models.TextField(verbose_name='text')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='created at')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='updated at')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='creator')
    status = models.BooleanField(default=True, verbose_name='status')

