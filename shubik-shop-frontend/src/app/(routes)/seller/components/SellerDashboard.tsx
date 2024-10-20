"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Hook para redirección
import {jwtDecode} from 'jwt-decode'; // Importamos jwt-decode para decodificar el token
import axios from 'axios';
import Image from 'next/image';

interface Tienda {
  nombre_legal: string;
  razon_social?: string;
  direccion_fisica: string;
  telefono_principal: string;
  correo_electronico: string;
}

export default function TiendaProfile() {
  const [tienda, setTienda] = useState<Tienda | null>(null); // Estado para almacenar los datos de la tienda
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTiendaData = async () => {
      try {
        // Obtener el token de localStorage
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No se encontró el token');
        }

        // Decodificar el token para obtener el ID de la tienda
        const decodedToken: any = jwtDecode(token); // Decodificamos el token
        const tiendaId = decodedToken.tienda_id; // Asumimos que el ID de la tienda está en el campo 'tienda_id'

        console.log("ID de la tienda:", tiendaId);

        // Hacemos la solicitud para obtener los datos de la tienda usando el ID
        const response = await axios.get(`http://127.0.0.1:8000/api/tiendas/tiendas/${tiendaId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setTienda(response.data); // Guardamos los datos de la tienda en el estado
      } catch (error) {
        console.error('Error al obtener los datos de la tienda:', error);
        setError('No se pudieron cargar los datos de la tienda.');
      } finally {
        setLoading(false);
      }
    };

    fetchTiendaData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un indicador de carga
  }

  if (error) {
    return <div>{error}</div>; // Mostrar mensaje de error
  }

  if (!tienda) {
    return <div>No se encontraron datos de la tienda</div>; // Si no hay tienda, mostrar mensaje
  }

  return (
    <div className="vendedor-profile bg-gray-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Perfil de {tienda.nombre_legal}</h1>
      <div className="space-y-2">
        <p><strong>Razón Social:</strong> {tienda.razon_social}</p>
        <p><strong>Dirección:</strong> {tienda.direccion_fisica}</p>
        <p><strong>Teléfono:</strong> {tienda.telefono_principal}</p>
        <p><strong>Email:</strong> {tienda.correo_electronico}</p>
      </div>
    </div>
  );
}