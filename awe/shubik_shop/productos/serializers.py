from rest_framework import serializers
from .models import Producto, Tipo_Prenda, Marca
from tiendas.models import Tienda

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['marca_id', 'marca']

class Tipo_PrendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo_Prenda
        fields = ['tipo', 'tipo_id']

class TiendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tienda
        fields = ['nombre_legal', 'tienda_id']
        ref_name = 'ProductoTiendaSerializer'  # Nombre único para este serializer

class ProductoSerializer(serializers.ModelSerializer):
    marca = MarcaSerializer(read_only=True, source='marca_id')
    tipo_prenda = Tipo_PrendaSerializer(read_only=True, source='tipo_id')  # Cambiamos a un serializador para tipo_prenda
    tienda = TiendaSerializer(read_only=True, source='tienda_id')  # Cambiamos a un serializador para tienda

    class Meta:
        model = Producto
        fields = [
            'producto_id', 
            'nombre', 
            'marca',  # Esto traerá los detalles completos de Marca
            'tipo_prenda',  # Cambiamos para usar Tipo_PrendaSerializer
            'tienda',  # Cambiamos para usar TiendaSerializer
            'estado', 
            'tamano', 
            'precio_inicial', 
            'precio_ofertado', 
            'imagen_1', 
            'imagen_2', 
            'imagen_3', 
            'imagen_4', 
            'slug', 
            'descripcion'
        ]

    def get_images(self, obj):
        return [
            obj.imagen_1.url if obj.imagen_1 else None,
            obj.imagen_2.url if obj.imagen_2 else None,
            obj.imagen_3.url if obj.imagen_3 else None,
            obj.imagen_4.url if obj.imagen_4 else None,
        ]
