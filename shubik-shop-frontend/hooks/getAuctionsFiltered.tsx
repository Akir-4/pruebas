import { useEffect, useState } from "react";
import { Producto } from "../types/auction"; // Tipado del producto

export function useGetAuctionsFiltered(
    prendaId: number | string,
    searchQuery: string,
    talla: string,
    estado: number | string,
    marca: number | string,
    ordenPrecio: string
) {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos/productos/`;

    const queryParams = new URLSearchParams();

    if (prendaId) {
        queryParams.append("tipo_id", String(prendaId)); // Filtrar por tipo de prenda
    }

    if (searchQuery) {
        queryParams.append("nombre", encodeURIComponent(searchQuery)); // Filtrar por nombre de producto
    }

    if (talla) {
        queryParams.append("tamano", encodeURIComponent(talla)); // Filtrar por talla
    }

    if (estado) {
        queryParams.append("estado", String(estado)); // Filtrar por estado
    }

    if (marca) {
        queryParams.append("marca_id", String(marca));  // Filtrar por marca
    }

    if (ordenPrecio) {
        queryParams.append("ordering", ordenPrecio);  // Ordenar por precio_inicial
    }

    const queryString = queryParams.toString();
    if (queryString) {
        url += `?${queryString}`;
    }

    console.log("URL construida:", url);  // Verificar la URL construida

    const [result, setResult] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                console.log("Fetching URL:", url);  // Ver la URL construida
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const json: Producto[] = await res.json();
                setResult(json);
                setError(null);
            } catch (error: any) {
                setError(error.message || 'Error fetching products');
            } finally {
                setLoading(false);
            }
        })();
    }, [url, prendaId, searchQuery, talla, estado, marca, ordenPrecio]);  // Añadir 'marca' y 'ordenPrecio' a la lista de dependencias

    return { result, loading, error };
}
