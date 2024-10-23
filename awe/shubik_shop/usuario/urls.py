from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UsuarioViewSet  # Solo importa el ViewSet

# Registrar el ViewSet usando DefaultRouter
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

# Incluir las rutas generadas por el router
urlpatterns = [
    path('', include(router.urls)),
    # Elimina la ruta para upload_image, ya que no es necesaria
]
