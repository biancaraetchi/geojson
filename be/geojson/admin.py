from django.contrib import admin
from .models import MunicipalitiesNl
import environ

env = environ.Env()
environ.Env.read_env()

admin.site.register(MunicipalitiesNl)