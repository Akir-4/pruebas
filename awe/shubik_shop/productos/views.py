from rest_framework import viewsets
from .models import Producto, Tipo_Prenda, Marca
from compras.models  import Puja, Subasta
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from django.db.models import Prefetch
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import ProductoSerializer, Tipo_PrendaSerializer, MarcaSerializer
from compras.serializers import PujaSerializer
from rest_framework.filters import OrderingFilter

class ProductoConPujasView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def get(self, request, *args, **kwargs):
        # Obtener el producto por su ID
        producto_id = self.kwargs['producto_id']  
        producto = get_object_or_404(
            Producto.objects.prefetch_related(
                Prefetch('subasta_set__puja_set', queryset=Puja.objects.all())
            ),
            pk=producto_id
        )

        # Serializar el producto
        producto_data = ProductoSerializer(producto).data

        # También puedes devolver datos de las pujas si es necesario
        subastas = producto.subasta_set.all()
        pujas = [PujaSerializer(puja).data for subasta in subastas for puja in subasta.puja_set.all()]

        # Devolver una respuesta combinada
        return Response({
            'producto': producto_data,
            'pujas': pujas,
        })

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]  # Agregar OrderingFilter
    filterset_fields = ['usuario_id', 'marca_id', 'estado', 'tamano', 'tipo_id']
    ordering_fields = ['precio_inicial']  # Permitir ordenar por precio
    ordering = ['precio_inicial']  # Ordenar por defecto por precio ascendente

    # listar producto por nombre
    def get_queryset(self):
        queryset = Producto.objects.all()
        nombre = self.request.query_params.get('nombre', None)
        if nombre:
            queryset = queryset.filter(nombre__icontains=nombre)  # Usa 'icontains' para coincidencias parciales e insensibles a mayúsculas
        return queryset

# buscar solo por el slug del producto   
class ProductoDetailView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'slug'  # Indica que usaremos el campo 'slug' para buscar el producto
    
class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class Tipo_PrendaViewSet(viewsets.ModelViewSet):
    queryset = Tipo_Prenda.objects.all()
    serializer_class = Tipo_PrendaSerializer

class ProductoListView(generics.ListAPIView):
    serializer_class = ProductoSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]  # Agregar OrderingFilter para permitir ordenación
    filterset_fields = ['tipo_id', 'estado']  # Agregar filtro por estado
    ordering_fields = ['precio_inicial']  # Agregar campo para ordenar por precio

    def get_queryset(self):
        queryset = Producto.objects.all()

        # Filtrar por tipo de prenda si el parámetro está presente en la consulta
        tipo = self.request.query_params.get('tipo_id', None)
        estado = self.request.query_params.get('estado', None)
        marca = self.request.query_params.get('marca', None)

        if tipo:
            queryset = queryset.filter(tipo_id=tipo)  # Esto es para filtrar por tipo de producto

        if estado:
            queryset = queryset.filter(estado=estado)  # y esto para filtrar por estado del producto

        if estado:
            queryset = queryset.filter(marca=marca)  # y esto para filtrar por marca del producto

        # Ordenar por precio
        ordering = self.request.query_params.get('ordering', 'precio_inicial')
        if ordering == 'precio_inicial':
            queryset = queryset.order_by('precio_inicial')
        elif ordering == '-precio_inicial':
            queryset = queryset.order_by('-precio_inicial')

        return queryset
