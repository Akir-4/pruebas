from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import SubastaViewSet, PujaViewSet, TransaccionViewSet

router = DefaultRouter()
router.register(r'subastas', SubastaViewSet)
router.register(r'pujas', PujaViewSet)
router.register(r'transacciones', TransaccionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]