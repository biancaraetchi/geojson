from rest_framework import serializers
from .models import MunicipalitiesNl

class MunicipalitiesNlSerializer(serializers.ModelSerializer):
    class Meta:
        model = MunicipalitiesNl
        fields = ['ogc_fid', 'geom_text', 'name']