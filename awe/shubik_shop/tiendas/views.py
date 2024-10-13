from rest_framework import generics
from .models import Tienda
from .serializers import TiendaSerializer

class TiendaListCreateView(generics.ListCreateAPIView):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer

class TiendaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer
