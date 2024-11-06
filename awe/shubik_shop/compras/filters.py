import django_filters
from .models import Subasta

class SubastaFilter(django_filters.FilterSet):
    producto_nombre = django_filters.CharFilter(field_name='producto_id__nombre', lookup_expr='icontains')
    tipo_id = django_filters.NumberFilter(field_name='producto_id__tipo_id')
    estado_producto = django_filters.NumberFilter(field_name='producto_id__estado')
    marca = django_filters.NumberFilter(field_name='producto_id__marca_id')
    tamano = django_filters.CharFilter(field_name='producto_id__tamano', lookup_expr='exact')

    ordering = django_filters.OrderingFilter(
        fields=(
            ('precio_inicial', 'precio_inicial'),
        ),
    )

    class Meta:
        model = Subasta
        fields = ['producto_nombre', 'tipo_id', 'estado_producto', 'marca', 'tamano']
