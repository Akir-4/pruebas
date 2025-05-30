from rest_framework import serializers
from .models import Puja, Subasta, Transaccion
from productos.models import Producto
from productos.serializers import ProductoSerializer, MarcaSerializer, Tipo_PrendaSerializer
from tiendas.serializers import TiendaSerializer
from usuario.serializers import UsuarioSerializer

class ProductoSerializer(serializers.ModelSerializer):
    marca = MarcaSerializer(read_only=True, source='marca_id')  # Usar 'marca_id' para obtener los datos de la marca
    tipo_prenda = Tipo_PrendaSerializer(read_only=True, source='tipo_id')  # Cambiamos a un serializador para tipo_prenda
    tienda = TiendaSerializer(read_only=True, source='tienda_id')

    class Meta:
        model = Producto
        fields = [
            'producto_id', 
            'tienda',
            'nombre', 
            'marca',  # Aquí incluimos los datos completos de la marca
            'tipo_prenda', 
            'estado', 
            'tamano',  
            'imagen_1', 
            'imagen_2', 
            'imagen_3', 
            'imagen_4', 
            'slug', 
            'descripcion',
            'tienda_id'
        ]
        ref_name = 'ProductoSerializerCompras'  # Nombre único

class PujaSerializer(serializers.ModelSerializer):  
    usuario = UsuarioSerializer(read_only=True, source='usuario_id')

    class Meta:
        model = Puja
        fields = ['puja_id', 'subasta_id', 'usuario_id', 'usuario', 'monto', 'fecha']

class SubastaSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True, source='producto_id')
    producto_id = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all(), write_only=True)  # Añadir producto_id como campo writable
    pujas = PujaSerializer(many=True, read_only=True, source='puja_set')
    precio_final = serializers.IntegerField(read_only=True)
    fecha_inicio = serializers.DateTimeField()  # Cambiado a DateTimeField
    fecha_termino = serializers.DateTimeField()  # Cambiado a DateTimeField

    class Meta:
        model = Subasta
        fields = [
            'subasta_id', 
            'tienda_id', 
            'producto',
            'producto_id',  # Asegúrate de incluir producto_id
            'fecha_inicio', 
            'fecha_termino', 
            'estado', 
            'pujas',
            'precio_inicial',
            'precio_final'
        ]


class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = '__all__'
