from django.db import models

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    usuario = models.CharField(max_length=100, unique=True) # Asegúrate de que 'usuario' sea único
    contrasena = models.CharField(max_length=100) # Contraseña en texto plano
    email = models.EmailField(max_length=100)
    direccion = models.CharField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=100, null=True, blank=True)
    imagen = models.ImageField(upload_to='usuarios/fotos/', null=True, blank=True)

    # Elimina el método save que encripta la contraseña
    def __str__(self):
        return self.usuario # Representa el usuario por su nombre de usuario