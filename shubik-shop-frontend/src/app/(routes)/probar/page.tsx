'use client'
import React from 'react';
import { useGetAuctions } from '../../../../api/useGetAuctions'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

const ProductList: React.FC = () => {
    const { result, loading, error } = useGetAuctions();

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(result)
    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {result && result.map(producto => (
                    <li key={producto.producto_id}>
                        <h2>{producto.nombre}</h2>
                        <p>Marca: {producto.marca_id.marca}</p>
                        <p>Tipo: {producto.tipo_id.tipo}</p>
                        <p>Estado: {producto.estado}</p>
                        <p>Tamaño: {producto.tamano}</p>
                        <p>Precio Inicial: ${producto.precio_inicial}</p>
                        <p>Precio Ofertado: ${producto.precio_ofertado}</p>
                        {producto.imagen && <img src={producto.imagen} alt={producto.nombre} />}
                        <p>Descripción: {producto.descripcion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
