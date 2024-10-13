import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegistroEmpresa() {
  const [nombreLegal, setNombreLegal] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [rut, setRut] = useState('');
  const [sector, setSector] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registro de empresa enviado', { nombreLegal, razonSocial, rut, sector, direccion, telefono, email });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-serif font-bold text-gray-800">Registro de Empresa</h1>
            <p className="text-gray-600">
              Registre su empresa para acceder a nuestros servicios empresariales.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombreLegal" className="block text-sm font-medium text-gray-700">
                  Nombre Legal
                </label>
                <input
                  type="text"
                  id="nombreLegal"
                  value={nombreLegal}
                  onChange={(e) => setNombreLegal(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700">
                  Razón Social
                </label>
                <input
                  type="text"
                  id="razonSocial"
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
                  RUT Empresa
                </label>
                <input
                  type="text"
                  id="rut"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                  Sector o Industria
                </label>
                <input
                  type="text"
                  id="sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección Física
                </label>
                <input
                  type="text"
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Teléfono Principal
                </label>
                <input
                  type="tel"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
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
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Registrar Empresa
              </button>
            </form>
            <p className="text-sm text-gray-600 text-center">
              ¿Ya tiene una cuenta?{' '}
              <Link href="/iniciar-sesion" className="text-gray-800 hover:underline">
                Inicie sesión aquí
              </Link>
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
                  <p className="text-xl">Únase a nuestra red de socios comerciales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}