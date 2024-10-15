from rest_framework import viewsets
from .models import Subasta, Puja, Transaccion
from .serializers import SubastaSerializer, PujaSerializer, TransaccionSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import SubastaFilter  # Importar el filtro

class SubastaViewSet(viewsets.ModelViewSet):
    serializer_class = SubastaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SubastaFilter
    
    def get_queryset(self):
        # Optimizar la carga de las relaciones producto_id, marca y tipo_prenda
        queryset = Subasta.objects.select_related('producto_id', 'producto_id__marca_id', 'producto_id__tipo_id').all()

        # Filtrar por producto si se proporciona producto_id
        producto_id = self.request.query_params.get('producto_id', None)
        if producto_id:
            queryset = queryset.filter(producto_id=producto_id)
        
        return queryset

class PujaViewSet(viewsets.ModelViewSet):
    queryset = Puja.objects.all()
    serializer_class = PujaSerializer

    def get_queryset(self):
        queryset = self.queryset
        producto_id = self.request.query_params.get('producto_id', None)
        if producto_id is not None:
            queryset = queryset.filter(puja__subasta__producto=producto_id)
        return queryset

class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer

    
