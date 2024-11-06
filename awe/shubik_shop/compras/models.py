from django.db import models

# Modelos para COMPRAS
class Subasta(models.Model):

    subasta_id = models.AutoField(primary_key=True)
    tienda_id = models.ForeignKey('tiendas.Tienda', on_delete=models.CASCADE)
    producto_id = models.ForeignKey('productos.Producto', on_delete=models.CASCADE)
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField()
    estado = models.CharField(max_length=20)


class Puja(models.Model):

    puja_id = models.AutoField(primary_key=True)
    subasta_id = models.ForeignKey('compras.Subasta', on_delete=models.CASCADE)
    usuario_id = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE)
    monto = models.IntegerField()
    fecha = models.DateField()

class Transaccion(models.Model):

    transaccion_id = models.AutoField(primary_key=True)
    puja_id = models.ForeignKey('compras.Subasta', on_delete=models.CASCADE)
    estado = models.CharField(max_length=20)
    fecha = models.DateField()



