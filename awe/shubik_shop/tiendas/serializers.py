from rest_framework import serializers
from .models import Tienda

class TiendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tienda
        fields = '__all__'
        ref_name = 'TiendaTiendaSerializer'  # Nombre único para este serializer
    
    nombre_legal = serializers.CharField(required=False)
    rut = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    sector = serializers.CharField(required=False)
    tamano_empresa = serializers.CharField(required=False)
    direccion_fisica = serializers.CharField(required=False)
    telefono_principal = serializers.CharField(required=False)