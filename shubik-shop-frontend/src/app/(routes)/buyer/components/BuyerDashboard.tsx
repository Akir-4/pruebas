"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { usuario } from "../../../../../types/user"; // Asegúrate de que la ruta es correcta

const BuyerDashboard = () => {
  const [comprador, setComprador] = useState<usuario | null>(null); // Datos del usuario logueado

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('usuario'); // Obtener el usuario desde localStorage
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userId = user.usuario_id; // Obtener el usuario_id

        try {
          const response = await axios.get<usuario>(`http://127.0.0.1:8000/api/usuarios/usuarios/${userId}/`); // Llamada a la API
          setComprador(response.data); // Establecer los datos del usuario
          console.log("Datos del usuario:", response.data); // Log de los datos del usuario
        } catch (error) {
          console.error("Error al cargar los datos del usuario:", error);
        }
      } else {
        console.log("Usuario no encontrado en localStorage");
      }
    };

    fetchUserData(); // Ejecutar la función para cargar los datos
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
        <p>Usuario: {comprador.usuario}</p>
        <p>Teléfono: {comprador.telefono}</p>
        <p>Descripción: {comprador.descripcion || 'Sin descripción'}</p>
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