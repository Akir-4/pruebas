import logging
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Usuario  # Asegúrate de que el modelo Usuario esté importado
from .serializers import UsuarioSerializer

# Configurar logging
logger = logging.getLogger(__name__)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def perform_create(self, serializer):
        # Guardar el usuario con la imagen proporcionada
        imagen = self.request.FILES.get('imagen')
        if imagen:
            logger.info("Subiendo imagen para el nuevo usuario.")
            serializer.save(imagen=imagen)
            logger.info("Imagen subida con éxito.")
        else:
            logger.warning("No se proporcionó imagen, guardando usuario sin imagen.")
            serializer.save()  # Si no hay imagen, guarda el usuario sin la imagen

    def perform_update(self, serializer):
        # Manejar la subida de la nueva imagen al actualizar
        imagen = self.request.FILES.get('imagen')
        if imagen:
            logger.info("Subiendo nueva imagen para el usuario.")
            serializer.save(imagen=imagen)
            logger.info("Nueva imagen subida con éxito.")
        else:
            # Si no hay imagen, guarda los otros datos
            serializer.save()
