"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';  // Importamos el hook useRouter

interface LoginProps {
  onCompanyLogin: () => void;   // Función para cambiar a la vista de LoginCompany
  onRegisterPerson: () => void; // Función para cambiar a la vista de CreateAccountPerson
}

export default function Login({ onCompanyLogin, onRegisterPerson }: LoginProps) {
  const router = useRouter();  // Iniciamos el hook useRouter
  const [usuario, setUsuario] = useState<string>('');  // Añadimos tipado explícito a los estados
  const [contrasena, setContrasena] = useState<string>('');
  const [error, setError] = useState<string | null>(null);  // Actualización: Permitir que el error sea null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Envía los parámetros en la URL (como en Postman)
      const response = await fetch(`http://127.0.0.1:8000/api/login/?usuario=${usuario}&contrasena=${contrasena}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // El encabezado está dentro del objeto
        },
      });

      const data = await response.json(); // Respuesta de la API

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Mostrar los tokens en la consola
      console.log('Token de acceso:', data.access);
      console.log('Token de refresh:', data.refresh);

      // Guardar los tokens en localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      console.log('Inicio de sesión exitoso');

      // Redirigir al menú principal
      router.push('/');  // Redirigir al menú en 'http://localhost:3000'

    } catch (err: any) {  // Usamos any porque no siempre es un Error
      if (err instanceof Error) {
        setError(err.message);  // Si es una instancia de Error, extraemos el mensaje
      } else {
        setError('Error inesperado');  // Si no lo es, un mensaje por defecto
      }
      console.error('Error al iniciar sesión:', err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-serif font-bold text-gray-800">Iniciar Sesión</h1>
            <p className="text-gray-600">
              Bienvenido de nuevo. Ingrese sus credenciales para acceder a su cuenta.
            </p>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Iniciar Sesión
              </button>
            </form>
            <p className="text-sm text-gray-600 text-center">
              ¿No tiene una cuenta?{' '}
              <button
                onClick={onRegisterPerson}
                className="text-gray-800 hover:underline"
              >
                Regístrese aquí
              </button>
            </p>
            <div className="pt-4 text-center">
              <button
                onClick={onCompanyLogin}
                className="inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Iniciar Sesión como Empresa
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative h-full">
              <Image
                src="/placeholder.svg"
                alt="Paisaje americano"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-white text-center">
                  <h2 className="text-3xl font-bold mb-2">Ropa Americana</h2>
                  <p className="text-xl">Estilo atemporal para el aventurero moderno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}