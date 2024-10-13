from rest_framework import viewsets
from .models import Subasta, Puja, Transaccion
from .serializers import SubastaSerializer, PujaSerializer, TransaccionSerializer

class SubastaViewSet(viewsets.ModelViewSet):
    queryset = Subasta.objects.all()
    serializer_class = SubastaSerializer

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

    
