from django.urls import path
from .views import TiendaListCreateView, TiendaDetailView

urlpatterns = [
    path('tiendas/', TiendaListCreateView.as_view(), name='tiendas-list'),
    path('tiendas/<int:pk>/', TiendaDetailView.as_view(), name='tienda-detail'),
]
