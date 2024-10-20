"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importamos useRouter para redirigir después de iniciar sesión
import Image from 'next/image';

interface LoginCompanyProps {
  onRegisterCompany: () => void;
}

export default function LoginCompany({ onRegisterCompany }: LoginCompanyProps) {
  const [email, setEmail] = useState<string>('');  // Correo electrónico de la tienda
  const [nombre_Legal, setNombreLegal] = useState<string>(''); // Nombre legal de la tienda
  const [password, setPassword] = useState<string>('');  // Contraseña
  const [error, setError] = useState<string | null>(null);  // Manejo de errores
  const router = useRouter();  // Hook para la redirección

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');  // Limpiamos los errores

    try {
      const loginData = {
        correo_electronico: email,
        contrasena: password,
        nombre_legal: nombre_Legal,
      };

      // Realizamos la solicitud al backend
      const response = await fetch(`http://127.0.0.1:8000/api/login/tienda/?email=${email}&nombre_legal=${nombre_Legal}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Error al iniciar sesión');
      }

      // Guardar el token en localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      // Redirigir al menú principal para tiendas (/seller)
      router.push('/seller');  // Redirigimos a la página /seller

    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      console.error('Error al iniciar sesión:', err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-serif font-bold text-gray-800">Iniciar Sesión de Tienda</h1>
            <p className="text-gray-600">
              Ingrese las credenciales de su tienda para acceder a la cuenta.
            </p>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre Legal de la Tienda
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre_Legal}
                  onChange={(e) => setNombreLegal(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              ¿No tiene una cuenta empresarial?{' '}
              <button
                onClick={onRegisterCompany}
                className="text-gray-800 hover:underline"
              >
                Regístrese aquí
              </button>
            </p>
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
                  <p className="text-xl">Soluciones empresariales de calidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}