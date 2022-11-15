from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    username = models.CharField(max_length=32, unique=True, verbose_name='username')
    firstname = models.CharField(max_length=32, verbose_name='first name')
    lastname = models.CharField(max_length=32, verbose_name='last name')
    email = models.EmailField(max_length=32, unique=True, verbose_name='email')
