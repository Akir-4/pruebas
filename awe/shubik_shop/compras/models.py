from django.db import models
from datetime import datetime
import pytz
from django.utils import timezone

class Subasta(models.Model):
    subasta_id = models.AutoField(primary_key=True)
    tienda_id = models.ForeignKey('tiendas.Tienda', on_delete=models.CASCADE)
    producto_id = models.ForeignKey('productos.Producto', on_delete=models.CASCADE)
    fecha_inicio = models.DateTimeField()  # Cambiar DateField a DateTimeField
    fecha_termino = models.DateTimeField()  # Cambiar DateField a DateTimeField

    # Opciones para el estado de la subasta
    ESTADO_OPCIONES = [
        ('vigente', 'Vigente'),
        ('activa', 'Activa'),
        ('cerrada', 'Cerrada'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADO_OPCIONES, default='vigente')

    precio_inicial = models.IntegerField(null=True, blank=True)  # Añadir aquí el precio inicial
    precio_final = models.IntegerField(null=True, blank=True)  # Precio final cuando se cierra la subasta

    @property
    def sub_terminada(self):
        timezone = pytz.UTC  # Ajusta la zona horaria según tus necesidades
        fecha_termino_aware = self.fecha_termino.astimezone(timezone)  # Asegurar que `fecha_termino` sea offset-aware
        return datetime.now(timezone) > fecha_termino_aware
    
    def finalizar_subasta(self):
        # Obtener la puja ganadora (la más alta)
        puja_ganadora = self.puja_set.order_by('-monto').first()
        if puja_ganadora:
            self.precio_final = puja_ganadora.monto
            self.estado = "cerrada"
            self.save()



class Puja(models.Model):
    puja_id = models.AutoField(primary_key=True)
    subasta_id = models.ForeignKey('compras.Subasta', on_delete=models.CASCADE, related_name='puja_set')
    usuario_id = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE)
    monto = models.IntegerField()
    fecha = models.DateTimeField()

class Transaccion(models.Model):
    transaccion_id = models.AutoField(primary_key=True)
    puja_id = models.ForeignKey(Puja, on_delete=models.CASCADE)  # Cambia la relación a 'Puja'
    estado = models.CharField(max_length=20)
    fecha = models.DateTimeField(default=timezone.now)
    token_ws = models.CharField(max_length=100, blank=True, null=True)
    monto = models.IntegerField()



