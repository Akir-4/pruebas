"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { usuario } from "../../../../../types/user";
import { Producto } from "../../../../../types/auction";
import ProductList from './ProductList'; // Asegúrate de tener este componente configurado para el modal
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import StarRatings from 'react-star-ratings';

const Sidebar = ({ nombre, descripcion, rating, setViewMode, viewMode }: { nombre: string, descripcion: string, rating: number, setViewMode: (mode: 'subastas' | 'compras') => void, viewMode: 'subastas' | 'compras' }) => {
  return (
    <div className="w-1/5 h-screen bg-gray-100 flex flex-col items-center pt-8 shadow-lg">
      {/* Imagen de perfil */}
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
      {/* Nombre del usuario */}
      <h2 className="text-lg font-bold">{nombre}</h2>
      <p className="text-sm text-gray-600">{descripcion}</p>
      {/* Puntuación de estrellas */}
      <div className="mt-4">
        <StarRatings
          rating={rating}
          starRatedColor="#FFD700"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="3px"
        />
      </div>
      {/* Botones para cambiar entre subastas y compras */}
      <div className="mt-10">
        <button 
          className={`w-full flex items-center justify-center px-6 py-2 text-center rounded-lg mb-4 ${viewMode === 'subastas' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('subastas')}
        >
          Ver Subastas
        </button>
        <button 
          className={`w-full flex items-center justify-center px-6 py-2 text-center rounded-lg ${viewMode === 'compras' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('compras')}
        >
          Ver Compras
        </button>
      </div>
    </div>
  );
};

const VendedorProfile = () => {
  const [vendedor, setVendedor] = useState<usuario | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [compras, setCompras] = useState<Producto[]>([]); // Para las subastas ganadas/compras
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editProducto, setEditProducto] = useState<Producto | null>(null); // Producto a editar
  const [viewMode, setViewMode] = useState<'subastas' | 'compras'>('subastas'); // Estado para manejar las vistas

  useEffect(() => {
    const fetchVendedorYProductos = async () => {
      try {
        const responseUsuario = await axios.get<usuario[]>("http://127.0.0.1:8000/api/usuarios/usuarios/");
        const usuarioFiltrado = responseUsuario.data.find((user) => user.usuario_id === 2); 
        setVendedor(usuarioFiltrado || null);
        if (usuarioFiltrado) {
          const responseProductos = await axios.get<Producto[]>(`http://127.0.0.1:8000/api/productos/productos/?usuario_id=${usuarioFiltrado.usuario_id}`);
          setProductos(responseProductos.data || []);
          const responseCompras = await axios.get<Producto[]>(`http://127.0.0.1:8000/api/compras/?usuario_id=${usuarioFiltrado.usuario_id}`); // Consulta para las compras
          setCompras(responseCompras.data || []);
        }
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos del perfil o productos");
        setLoading(false);
      }
    };
    fetchVendedorYProductos();
  }, []);

  // Manejar la apertura del modal para subastar o editar
  const handleSubastarClick = () => {
    setEditProducto(null); 
    setShowModal(true);
  };

  const handleEditClick = (producto: Producto) => {
    setEditProducto(producto); 
    setShowModal(true);
  };

  // Manejar la eliminación de un producto
  const handleDeleteClick = async (productoId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/productos/productos/${productoId}/`);
      setProductos(productos.filter((prod) => prod.producto_id !== productoId)); // Actualizar la lista de productos
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!vendedor) return <p>No se encontró el usuario</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar nombre={vendedor.nombre} descripcion={vendedor.descripcion} rating={4.5} setViewMode={setViewMode} viewMode={viewMode} />

      {/* Contenido principal */}
      <div className="w-4/5 p-8 bg-white mx-auto rounded-lg shadow-md mt-2">
        {viewMode === 'subastas' ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Tus subastas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-xs leading-normal">
                    <th className="py-3 px-6 text-left">Producto</th>
                    <th className="py-3 px-6 text-left">Estado</th>
                    <th className="py-3 px-6 text-center">Precio Inicial</th>
                    <th className="py-3 px-6 text-center">Precio Ofertado</th>
                    <th className="py-3 px-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {productos.length > 0 ? (
                    productos.map((producto) => (
                      <tr key={producto.producto_id} className="border-b border-gray-300">
                        <td className="py-3 px-6">{producto.nombre}</td>
                        <td className="py-3 px-6">{producto.estado}</td>
                        <td className="py-3 px-6 text-center">${producto.precio_inicial}</td>
                        <td className="py-3 px-6 text-center">${producto.precio_ofertado}</td>
                        <td className="py-3 px-6 text-center flex items-center justify-center space-x-2">
                          <button 
                            className="text-blue-500 flex items-center" 
                            onClick={() => handleEditClick(producto)}
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button 
                            className="text-red-500 flex items-center" 
                            onClick={() => handleDeleteClick(producto.producto_id)}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-3 px-6 text-center text-gray-500">
                        No hay productos disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Botón de subastar alineado a la derecha */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubastarClick}
                className="bg-[#00457C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Subastar
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Tus compras</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-xs leading-normal">
                    <th className="py-3 px-6 text-left">Producto</th>
                    <th className="py-3 px-6 text-left">Estado</th>
                    <th className="py-3 px-6 text-center">Precio Ganado</th>
                    <th className="py-3 px-6 text-center">Fecha de Compra</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {compras.length > 0 ? (
                    compras.map((producto) => (
                      <tr key={producto.producto_id} className="border-b border-gray-300">
                        <td className="py-3 px-6">{producto.nombre}</td>
                        <td className="py-3 px-6">{producto.estado}</td>
                        <td className="py-3 px-6 text-center">${producto.precio_ofertado}</td>
                        <td className="py-3 px-6 text-center">Fecha</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-3 px-6 text-center text-gray-500">
                        No hay compras disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Modal para añadir/editar producto */}
      {showModal && <ProductList productos={productos} editProducto={editProducto} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default VendedorProfile;
