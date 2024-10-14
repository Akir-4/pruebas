from rest_framework import serializers
from .models import Producto, Tipo_Prenda, Marca
from usuario.models import Usuario

class ProductoSerializer(serializers.ModelSerializer):
    # Utilizamos SlugRelatedField para trabajar con los nombres en lugar de los IDs
    marca_id = serializers.SlugRelatedField(queryset=Marca.objects.all(), slug_field='marca')
    tipo_id = serializers.SlugRelatedField(queryset=Tipo_Prenda.objects.all(), slug_field='tipo')
    usuario_id = serializers.SlugRelatedField(queryset=Usuario.objects.all(), slug_field='nombre')

    # Estos campos son redundantes ya que estamos usando SlugRelatedField, así que no es necesario agregarlos
    # Pero los dejamos si se quieren mostrar de manera explícita en el frontend
    marca_nombre = serializers.CharField(source='marca_id.marca', read_only=True)
    tipo_nombre = serializers.CharField(source='tipo_id.tipo', read_only=True)
    usuario_nombre = serializers.CharField(source='usuario_id.nombre', read_only=True)
    images = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_images(self, obj):
         return [
             obj.imagen_1.url if obj.imagen_1 else None,
             obj.imagen_2.url if obj.imagen_2 else None,
             obj.imagen_3.url if obj.imagen_3 else None,
             obj.imagen_4.url if obj.imagen_4 else None,
         ]

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['marca', 'marca_id']  

class Tipo_PrendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo_Prenda
        fields = ['tipo', 'tipo_id']  

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombre', 'usuario_id']
