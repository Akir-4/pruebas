"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Usuario } from "../../../../../types/user";
import { Subasta } from "../../../../../types/Subasta";  // Cambiar la ruta a Subasta.ts
import Image from 'next/image';
import { Edit, Package, History, Gavel } from 'lucide-react';

const BuyerDashboard = () => {
  const [comprador, setComprador] = useState<Usuario | null>(null);
  const [activeTab, setActiveTab] = useState('subastas');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null); // Estado para la imagen
  const [subastas, setSubastas] = useState<Subasta[]>([]); // Estado para las subastas

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decodedToken = jwtDecode<{ user_id: string }>(token);
          const userId = decodedToken.user_id;

          if (userId) {
            // Obtener datos del usuario
            const userResponse = await axios.get<Usuario>(`http://127.0.0.1:8000/api/usuarios/usuarios/${userId}/`, {
              headers: {
                'Authorization': `Token ${token}`,
              },
            });
            setComprador(userResponse.data);

            // Obtener subastas en las que el usuario ha participado
            const subastasResponse = await axios.get<Subasta[]>(`http://127.0.0.1:8000/api/subastas/participando/${userId}/`, {
              headers: {
                'Authorization': `Token ${token}`,
              },
            });
            setSubastas(subastasResponse.data);
          } else {
            console.error("El token no contiene 'user_id'.");
          }
        } catch (error) {
          console.error("Error al decodificar el token o cargar los datos del usuario:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    // Añadir los campos que deseas actualizar
    const target = e.currentTarget as HTMLFormElement;
    const usuario = (target.elements.namedItem('usuario_id') as HTMLInputElement)?.value;
    const nombre = (target.elements.namedItem('nombre') as HTMLInputElement)?.value;
    const email = (target.elements.namedItem('email') as HTMLInputElement)?.value;
    const contrasena = (target.elements.namedItem('contrasena') as HTMLInputElement)?.value;
    const telefono = (target.elements.namedItem('telefono') as HTMLInputElement)?.value;
    const direccion = (target.elements.namedItem('direccion') as HTMLInputElement)?.value;

    if (usuario) formData.append('usuario', usuario);
    if (nombre) formData.append('nombre', nombre);
    if (email) formData.append('email', email);
    if (contrasena) formData.append('contrasena', contrasena);
    if (telefono) formData.append('telefono', telefono);
    if (direccion) formData.append('direccion', direccion);

    if (image) {
      formData.append('imagen', image);
    }

    const token = localStorage.getItem("access_token");

    if (comprador) {
      try {
        console.log('Datos enviados:', Object.fromEntries(formData.entries()));

        // Hacer la solicitud PUT al backend
        const response = await axios.put(
          `http://127.0.0.1:8000/api/usuarios/usuarios/${comprador.usuario_id}/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${token}`,  // Agregar el token aquí también
            }
          }
        );

        // Actualizar el estado del comprador en el frontend con los datos de la respuesta
        setComprador(response.data);
        setIsEditModalOpen(false);
      } catch (error: any) {
        console.error("Error al actualizar los datos del comprador:", error);
        if (error.response) {
          console.error("Datos recibidos del servidor:", error.response.data);
        }
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'subastas':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Subastas</h2>
            {subastas.length > 0 ? (
              <ul>
                {subastas.map((subasta) => (
                  <li key={subasta.subasta_id} className="mb-4 p-4 border rounded shadow">
                    <h3 className="text-xl font-semibold">{subasta.producto.nombre}</h3>
                    <p><strong>Estado:</strong> {subasta.estado}</p>
                    <p><strong>Precio Inicial:</strong> ${subasta.producto.precio_inicial}</p> {/* Cambiar a subasta.producto.precio_inicial */}
                    <p><strong>Fecha de Término:</strong> {new Date(subasta.fecha_termino).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No hay subastas disponibles.</p>
            )}
          </div>
        );
      case 'pujas':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mis Pujas</h2>
            <p className="text-gray-600">No hay pujas activas.</p>
          </div>
        );
      case 'historial':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Historial</h2>
            <p className="text-gray-600">No hay historial disponible.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!comprador) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando datos del perfil...</p>
      </div>
    );
  }

  // Construir la URL de la imagen correctamente
  const imageUrl = comprador?.imagen?.startsWith("http")
    ? comprador.imagen
    : `http://127.0.0.1:8000${comprador.imagen}`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={imageUrl}
              alt="Foto de perfil"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Edit size={16} />
            </button>
          </div>
          <h2 className="text-xl font-bold">{comprador.nombre}</h2>
        </div>
        <div className="space-y-2">
          <p><strong>Email:</strong> {comprador.email}</p>
          <p><strong>Teléfono:</strong> {comprador.telefono}</p>
          <p><strong>Dirección:</strong> {comprador.direccion || 'Sin dirección'}</p>
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Editar Datos
        </button>
        <div className="mt-8 space-y-2">
          <button
            className={`w-full text-left py-2 px-4 rounded ${activeTab === 'subastas' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('subastas')}
          >
            <Package className="inline-block mr-2" size={18} /> Mis Subastas
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded ${activeTab === 'pujas' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('pujas')}
          >
            <Gavel className="inline-block mr-2" size={18} /> Mis Pujas
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded ${activeTab === 'historial' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('historial')}
          >
            <History className="inline-block mr-2" size={18} /> Historial
          </button>
        </div>
      </div>
      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label htmlFor="usuario_id" className="block text-sm font-medium text-gray-700">Usuario ID</label>
                <input
                  type="text"
                  id="usuario_id"
                  name="usuario_id"
                  defaultValue={comprador.usuario_id}
                  required
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-200"
                />
              </div>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  defaultValue={comprador.nombre}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={comprador.email}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  defaultValue={comprador.telefono}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  defaultValue={comprador.direccion || ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Imagen</label>
                <input
                  type="file"
                  id="imagen"
                  name="imagen"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow p-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default BuyerDashboard;
