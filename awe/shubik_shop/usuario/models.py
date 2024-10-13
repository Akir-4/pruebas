from django.db import models
from django.contrib.auth.hashers import make_password

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    usuario = models.CharField(max_length=100)
    contrasena = models.CharField(max_length=100)  # La contraseña debería ser encriptada
    email = models.EmailField(max_length=100)
    direccion = models.CharField(max_length=100, null=True, blank=True)
    telefono = models.CharField(max_length=100, null=True, blank=True)
    imagen = models.ImageField(upload_to='usuarios/fotos/', null=True, blank=True)

    def save(self, *args, **kwargs):
        # Encriptar la contraseña antes de guardar
        if not self.pk or self.contrasena != Usuario.objects.get(pk=self.pk).contrasena:
            self.contrasena = make_password(self.contrasena)
        super(Usuario, self).save(*args, **kwargs)

    def __str__(self):
        return self.usuario  # Aquí te refieres al campo 'usuario'

    


