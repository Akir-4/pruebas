from django.db import models

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    usuario = models.CharField(max_length=100, unique=True)  # Nombre de usuario único
    contrasena = models.CharField(max_length=100)  # Recomendación: encriptar contraseñas
    email = models.EmailField(max_length=100, unique=True)
    direccion = models.CharField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=100, null=True, blank=True)
    imagen = models.ImageField(upload_to='usuarios/fotos/', null=True, blank=True)

    def __str__(self):
        return self.usuario

    def es_admin(self):
        # Aquí verificas si el usuario actual es el administrador
        return self.email == "admin@example.com"  # Cambia por el correo del administrador
