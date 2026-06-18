# users/models.py

from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from django.db import models

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=555, null=True, blank=True)
    first_name = models.CharField(max_length=55, null=True, blank=True)
    last_name = models.CharField(max_length=55, null=True, blank=True)
    shipping_address = models.CharField(max_length=500, null=True, blank=True)
    city = models.CharField(max_length=55, null=True, blank=True)
    country = models.CharField(max_length=55, null=True, blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()