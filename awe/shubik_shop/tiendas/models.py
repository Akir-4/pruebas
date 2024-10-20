from django.db import models

class Tienda(models.Model):
    """Modelo para representar una tienda o empresa."""
    tienda_id = models.AutoField(primary_key=True)
    nombre_legal = models.CharField(max_length=255)
    razon_social = models.CharField(max_length=255, blank=True)
    rut = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    direccion_fisica = models.TextField()
    telefono_principal = models.CharField(max_length=20)
    correo_electronico = models.EmailField()

    def __str__(self):
        return self.nombre_legal


class Bodega(models.Model):
    """Modelo para representar una bodega."""
    bodega_id = models.AutoField(primary_key=True)
    tienda_id = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    producto_id = models.ForeignKey('productos.Producto', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.tienda_id.nombre_legal} - Producto: {self.producto_id.nombre if self.producto_id else "Sin producto"}'
