"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Usuario } from "../../../../../types/user";  // Asegúrate de que la ruta es correcta
import Image from 'next/image';
import { Edit, Package, History, Gavel, X } from 'lucide-react';

const BuyerDashboard = () => {
  const [comprador, setComprador] = useState<Usuario | null>(null);
  const [activeTab, setActiveTab] = useState('subastas');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null); // Estado para la imagen

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decodedToken = jwtDecode<{ user_id: string }>(token);
          const userId = decodedToken.user_id;

          if (userId) {
            const response = await axios.get<Usuario>(`http://127.0.0.1:8000/api/usuarios/usuarios/${userId}/`);
            setComprador(response.data);
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
    const formData = new FormData(e.currentTarget);

    // Si el comprador ya tiene una imagen, puede ser útil incluirla
    if (comprador?.imagen) {
        formData.append('imagen', comprador.imagen);  // Añadir la imagen actual si no se ha cambiado
    }

    // Añadir los campos que deseas actualizar
    formData.append('nombre', formData.get('nombre') as string);
    formData.append('email', formData.get('email') as string);
    formData.append('contrasena', formData.get('contrasena') as string);
    formData.append('telefono', formData.get('telefono') as string);
    formData.append('direccion', formData.get('direccion') as string);

    if (comprador) {
        try {
            console.log('Datos enviados:', Object.fromEntries(formData.entries()));

            // Hacer la solicitud PUT al backend
            const response = await axios.put(
                `http://127.0.0.1:8000/api/usuarios/usuarios/${comprador.usuario_id}/`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }  // Especificar el tipo de contenido
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
            <p className="text-gray-600">No hay subastas disponibles.</p>
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={comprador.imagen || "/placeholder.svg"}
              alt="Foto de perfil"
              layout="fill"
              className="rounded-full"
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Editar Datos de Usuario</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" id="nombre" name="nombre" defaultValue={comprador.nombre} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" defaultValue={comprador.email} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" defaultValue={comprador.telefono} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                <input type="text" id="direccion" name="direccion" defaultValue={comprador.direccion || ''} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Seleccionar Imagen</label>
                <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleImageChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-300">
                  Cancelar
                </button>
                <button type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
