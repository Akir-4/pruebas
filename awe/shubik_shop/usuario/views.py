import logging
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Usuario  # Asegúrate de que el modelo Usuario esté importado
from .serializers import UsuarioSerializer
from .utils import upload_image_to_blob  # Importa la función para subir imágenes

# Configurar logging
logger = logging.getLogger(__name__)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def perform_create(self, serializer):
        # Llama a la función para manejar la subida de la imagen al crear
        imagen = self.request.FILES.get('imagen')
        if imagen:
            logger.info("Subiendo imagen para el nuevo usuario.")
            file_object = upload_image_to_blob(imagen)
            if file_object:
                logger.info("Imagen subida con éxito. URL: %s", file_object['file_url'])
                # Guarda la URL de la imagen en el modelo
                serializer.save(imagen=file_object['file_url'])
            else:
                logger.error("Fallo en la subida de la imagen.")
                return Response({"error": "Failed to upload image"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.warning("No se proporcionó imagen, guardando usuario sin imagen.")
            serializer.save()  # Si no hay imagen, guarda el usuario sin la imagen

    def perform_update(self, serializer):
        # Manejar la subida de la nueva imagen al actualizar
        imagen = self.request.FILES.get('imagen')
        if imagen:
            logger.info("Subiendo nueva imagen para el usuario.")
            file_object = upload_image_to_blob(imagen)
            if file_object:
                logger.info("Nueva imagen subida con éxito. URL: %s", file_object['file_url'])
                serializer.save(imagen=file_object['file_url'])
            else:
                logger.error("Fallo en la subida de la nueva imagen.")
                return Response({"error": "Failed to upload new image"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Si no hay imagen, guarda los otros datos
            serializer.save()
