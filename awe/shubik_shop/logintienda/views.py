from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from tiendas.models import Tienda

class LoginTiendaView(APIView):
    def post(self, request):
        email = request.query_params.get('email')
        nombre_legal = request.query_params.get('nombre_legal')
        password = request.query_params.get('password')
        
        try:
            # Buscamos la tienda por correo electrónico y nombre legal
            tienda = Tienda.objects.get(correo_electronico=email, nombre_legal=nombre_legal)
            
            if tienda.password == password:  # Nota: debes usar hashing para mayor seguridad
                # Crear el token JWT usando tienda_id
                refresh = RefreshToken()
                refresh['tienda_id'] = tienda.tienda_id  # Guardamos el tienda_id en el token

                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({"error": "Contraseña incorrecta"}, status=401)
        except Tienda.DoesNotExist:
            return Response({"error": "Tienda no encontrada"}, status=404)
