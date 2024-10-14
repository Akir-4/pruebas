from django.db import models

class Tienda(models.Model):
    """Modelo para representar una tienda o empresa."""
    tienda_id = models.AutoField(primary_key=True)
    nombre_legal = models.CharField(max_length=255)
    razon_social = models.CharField(max_length=255, blank=True, null=True)
    rut = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    sector = models.CharField(max_length=100)
    tamano_empresa = models.CharField(max_length=100)  # Ej: "Pequeña", "Mediana", "Grande"
    direccion_fisica = models.TextField()
    telefono_principal = models.CharField(max_length=20)
    correo_electronico = models.EmailField()

    def __str__(self):
        return self.nombre_legal
