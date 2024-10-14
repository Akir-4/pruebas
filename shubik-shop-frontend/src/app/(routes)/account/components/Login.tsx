import React, { useState } from 'react';
import Image from 'next/image';

interface LoginProps {
  onCompanyLogin: () => void;   // Función para cambiar a la vista de LoginCompany
  onRegisterPerson: () => void; // Función para cambiar a la vista de CreateAccountPerson
}

export default function Login({ onCompanyLogin, onRegisterPerson }: LoginProps) {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [error, setError] = useState(''); // Para manejar errores

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear objeto de credenciales
    const credentials = { email, contrasena };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/usuarios/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();

      // Aquí puedes manejar lo que ocurre al iniciar sesión correctamente
      console.log('Inicio de sesión exitoso:', data);
      
      // Redirigir o manejar el estado de sesión según sea necesario
    } catch (err: any) {
      setError(err.message); // Establecer el mensaje de error
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
            {error && <p className="text-red-500">{error}</p>} {/* Mostrar error si existe */}
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={contrasena}
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
                    Recordarme
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
                src="/placeholder.svg?height=400&width=600"
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
