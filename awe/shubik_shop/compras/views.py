from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Subasta, Puja, Transaccion
from tiendas.models import Tienda
from productos.models import Producto
from .serializers import SubastaSerializer, PujaSerializer, TransaccionSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import SubastaFilter  # Importar el filtro
from datetime import date
from rest_framework.exceptions import ValidationError
from datetime import datetime
from rest_framework import status
from transbank.webpay.webpay_plus.transaction import Transaction
from django.shortcuts import redirect
from django.utils import timezone

class SubastaViewSet(viewsets.ModelViewSet):
    serializer_class = SubastaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SubastaFilter

    def get_queryset(self):
        # Cambiar los nombres de relación a 'marca_id', 'tipo_id', y 'tienda_id'
        queryset = Subasta.objects.select_related('producto_id__marca_id', 'producto_id__tipo_id', 'tienda_id').all()

        producto_id = self.request.query_params.get('producto_id', None)
        if producto_id:
            queryset = queryset.filter(producto_id=producto_id)

        return queryset

    @action(detail=True, methods=['post'])
    def finalizar(self, request, pk=None):
        subasta = self.get_object()
        if subasta.estado != 'activa':
            return Response({'error': 'Solo se pueden finalizar subastas activas'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Cambiar de date.today() a datetime.now() para manejar fecha y hora
        if subasta.fecha_termino <= datetime.now():
            subasta.finalizar_subasta()
            return Response({'status': 'Subasta finalizada exitosamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'La subasta no puede finalizar antes de la fecha y hora de término'}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        # Obtener el ID del producto del request
        producto_id = request.data.get('producto_id')

        # Verificar si ya existe una subasta vigente o activa para este producto
        if Subasta.objects.filter(producto_id=producto_id, estado__in=['vigente', 'activa']).exists():
            raise ValidationError({'error': 'El producto ya tiene una subasta vigente o activa y no puede ser subastado nuevamente.'})

        # Actualizar el campo `subastado` del producto para marcarlo como subastado
        Producto.objects.filter(producto_id=producto_id).update(subastado=True)

        # Proceder con la creación de la subasta si no hay conflictos
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def iniciar_pago(self, request, pk=None):
            subasta = self.get_object()

            # Verificar si la subasta ha finalizado
            if not subasta.sub_terminada:
                return Response({'error': 'La subasta no ha terminado aún.'}, status=status.HTTP_400_BAD_REQUEST)

            # Obtener la puja ganadora (la más alta)
            puja_ganadora = subasta.puja_set.order_by('-monto').first()
            if not puja_ganadora:
                return Response({'error': 'No hay puja ganadora para esta subasta'}, status=status.HTTP_400_BAD_REQUEST)

            monto = puja_ganadora.monto
            buy_order = f"{subasta.subasta_id}-{puja_ganadora.puja_id}"
            session_id = f"session-{subasta.subasta_id}"

            # URL a la cual Transbank redirigirá tras completar el pago
            return_url = 'http://localhost:3000/completado/'

            try:
                # Crear una instancia de Transaction
                transaction = Transaction()
                response = transaction.create(
                    buy_order=buy_order,
                    session_id=session_id,
                    amount=monto,
                    return_url=return_url
                )

               # Creación de la transacción en la base de datos
                Transaccion.objects.create(
                    puja_id=puja_ganadora,
                    estado="pendiente",
                    fecha=timezone.now(),
                    token_ws=response['token'],
                    monto=monto
                )

                # Retornar la URL generada por Transbank para redirigir al usuario
                return Response({'url': response['url'] + "?token_ws=" + response['token']}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': f'Error al iniciar la transacción: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'], url_path='confirmar_pago')
    def confirmar_pago(self, request):
        token_ws = request.data.get("token_ws")

        if not token_ws:
            return Response({"error": "Token de pago no recibido"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = Transaction.commit(token_ws)

            if response['status'] == "AUTHORIZED":
                # Actualizar la transacción a estado "completado"
                transaccion = Transaccion.objects.get(puja_id=response['buy_order'].split("-")[1])
                transaccion.estado = "completado"
                transaccion.save()

                return Response({"message": "Pago completado con éxito"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "El pago no fue autorizado"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Error al confirmar el pago: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PujaViewSet(viewsets.ModelViewSet):
    queryset = Puja.objects.all()
    serializer_class = PujaSerializer

    def get_queryset(self):
        queryset = self.queryset
        # Obtenemos el subasta_id de los parámetros de la URL
        subasta_id = self.request.query_params.get('subasta_id', None)
        if subasta_id is not None:
            # Filtramos las pujas por subasta_id
            queryset = queryset.filter(subasta_id=subasta_id)
        return queryset

    @action(detail=False, methods=['get'], url_path='subastas-usuario/(?P<usuario_id>[^/.]+)')
    def get_subastas_por_usuario(self, request, usuario_id):
        # Filtrar las pujas por el usuario
        pujas = Puja.objects.filter(usuario_id=usuario_id)
        # Obtener los IDs de subasta únicos de esas pujas
        subasta_ids = pujas.values_list('subasta_id', flat=True).distinct()
        # Obtener las subastas únicas
        subastas = Subasta.objects.filter(subasta_id__in=subasta_ids)
        # Serializar las subastas
        serializer = SubastaSerializer(subastas, many=True)
        return Response(serializer.data)
    def create(self, request, *args, **kwargs):
        subasta_id = request.data.get('subasta_id')
        subasta = Subasta.objects.get(pk=subasta_id)

        # Verificar que la subasta esté activa y no haya terminado
        if subasta.sub_terminada:
            return Response({'error': 'No se pueden hacer pujas en una subasta que ha finalizado.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().create(request, *args, **kwargs)

class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer
