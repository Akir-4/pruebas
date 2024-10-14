import React, { useState } from 'react';
import Image from 'next/image';

interface CreateAccountCompanyProps {
  onCompanyLogin: () => void; // Asegúrate de que onCompanyLogin sea aceptado como prop
}

const CreateAccountCompany: React.FC<CreateAccountCompanyProps> = ({ onCompanyLogin }) => {
  const [nombreLegal, setNombreLegal] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [sector, setSector] = useState('');
  const [tamano, setTamano] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const companyData = {
      nombre_legal: nombreLegal,
      razon_social: razonSocial,
      rut,
      password: password,
      sector,
      tamano_empresa: tamano,
      direccion_fisica: direccion,
      telefono_principal: telefono,
      correo_electronico: email,
    };

    console.log('Datos enviados:', companyData);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tiendas/tiendas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Empresa registrada con éxito!');
        console.log('Registro exitoso:', data);

        // Limpiar los campos después de un registro exitoso
        setNombreLegal('');
        setRazonSocial('');
        setRut('');
        setPassword('');
        setSector('');
        setTamano('');
        setDireccion('');
        setTelefono('');
        setEmail('');
      } else {
        const errorData = await response.json();
        console.log('Error en la solicitud:', errorData); // Esto imprimirá detalles del error
        setError('Error al crear la empresa: ' + (errorData.detail || 'Error desconocido'));
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      console.error('Error al registrar la empresa:', err);
    }
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
                <label htmlFor="tamano" className="block text-sm font-medium text-gray-700">
                  Tamaño de la Empresa
                </label>
                <input
                  type="text"
                  id="tamano"
                  value={tamano}
                  onChange={(e) => setTamano(e.target.value)}
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
                Registrar Empresa
              </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <p className="text-sm text-gray-600 text-center">
              ¿Ya tiene una cuenta?{' '}
              <button onClick={onCompanyLogin} className="text-gray-800 hover:underline">
                Inicie sesión aquí
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
                  <p className="text-sm">Conectando vendedores con compradores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountCompany;
