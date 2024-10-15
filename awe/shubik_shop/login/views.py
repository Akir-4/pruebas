from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from usuario.models import Usuario # Importa el modelo de usuario correcto
from django.contrib.auth.hashers import check_password

class LoginView(APIView):
    def post(self, request):
        usuario = request.query_params.get('usuario')
        contrasena = request.query_params.get('contrasena')

        try:
            # Busca el usuario en la base de datos
            user = Usuario.objects.get(usuario=usuario)

            # Verifica si la contraseña coincide
            if check_password(contrasena, user.contrasena):
                return Response({"mensaje": "Inicio de sesión exitoso"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)

        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)