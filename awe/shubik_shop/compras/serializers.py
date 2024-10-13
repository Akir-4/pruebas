from rest_framework import serializers
from .models import Puja, Subasta, Transaccion
from usuario.serializers import UsuarioSerializer

class SubastaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subasta
        fields = '__all__'


class PujaSerializer(serializers.ModelSerializer):  
    usuario_nombre = serializers.CharField(source= 'usuario_id.nombre', read_only=True)
    class Meta:
        model = Puja
        fields = '__all__'


class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = '__all__'