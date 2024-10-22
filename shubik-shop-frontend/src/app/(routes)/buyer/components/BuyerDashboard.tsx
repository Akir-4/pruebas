"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Usuario } from "../../../../../types/user";  // Asegúrate de que la ruta es correcta

const BuyerDashboard = () => {
  const [comprador, setComprador] = useState<Usuario | null>(null);

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

  if (!comprador) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando datos del perfil...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Perfil del Comprador</h1>
      <div>
        <p>Nombre: {comprador.nombre}</p>
        <p>Email: {comprador.email}</p>
        <p>Usuario: {comprador.usuario_id}</p>
        <p>Teléfono: {comprador.telefono}</p>
        <p>Descripción: {comprador.direccion || 'Sin descripción'}</p>
        {comprador.imagen && (
          <div>
            <h2>Imagen de perfil:</h2>
            <img src={comprador.imagen} alt="Imagen de perfil" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
