import React, { useState } from 'react';
import Image from 'next/image';

interface LoginCompanyProps {
  onReturnToLogin: () => void;
  onRegisterCompany: () => void;
}

export default function LoginCompany({ onReturnToLogin, onRegisterCompany }: LoginCompanyProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      correo_electronico: email, // Asegúrate de que este nombre coincida con tu API
      contrasena: password, // Asegúrate de que este nombre coincida con tu API
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tiendas/tiendas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Inicio de sesión exitoso!');
        console.log('Inicio de sesión exitoso:', data);
        // Aquí puedes manejar la redirección o cualquier otra acción tras un inicio de sesión exitoso
      } else {
        const errorData = await response.json();
        console.log('Error en la solicitud:', errorData); // Esto imprimirá detalles del error
        setError('Error al iniciar sesión: ' + (errorData.detail || 'Error desconocido'));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      console.error('Error al iniciar sesión:', err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-serif font-bold text-gray-800">Inicio de Sesión Empresarial</h1>
            <p className="text-gray-600">
              Acceda a su cuenta empresarial para gestionar sus servicios.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo Electrónico Corporativo
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordar cuenta
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Iniciar Sesión
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <p className="text-sm text-gray-600 text-center">
              ¿No tiene una cuenta empresarial?{' '}
              <button onClick={onRegisterCompany} className="text-gray-800 hover:underline">
                Regístrese aquí
              </button>
            </p>
            <p className="text-sm text-gray-600 text-center">
              <button onClick={onReturnToLogin} className="text-gray-800 hover:underline">
                Volver al inicio de sesión personal
              </button>
            </p>
          </div>
          <div className="hidden md:block">
            <div className="relative h-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Distrito empresarial"
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
