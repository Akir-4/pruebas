from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['usuario_id', 'nombre', 'usuario', 'contrasena', 'email', 'direccion', 'telefono', 'imagen']
        extra_kwargs = {
            'contrasena': {'write_only': True} # Para que la contraseña solo se pueda escribir, no leer
        }

    def create(self, validated_data):
        # Encripta la contraseña antes de crear el usuario
        validated_data['contrasena'] = make_password(validated_data['contrasena'])
        return super(UsuarioSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        # Encripta la contraseña al actualizar si está en los datos
        if 'contrasena' in validated_data:
            validated_data['contrasena'] = make_password(validated_data['contrasena'])
        return super(UsuarioSerializer, self).update(instance, validated_data)