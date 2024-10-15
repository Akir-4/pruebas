import { useEffect, useState } from "react";
import { Subasta } from "../types/subasta";  // Tipado de subasta

// Función para agregar un pequeño retraso (debounce) antes de ejecutar el fetch
function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function useGetAuctionsFiltered(
    prendaId: number | string,
    searchQuery: string,
    talla: string,
    estado: number | string,
    marca: number | string,
    ordenPrecio: string
) {
    const debouncedSearchQuery = useDebounce(searchQuery, 500);  // Debounce para la búsqueda

    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/compras/subastas/`;  // Cambiamos la URL base al endpoint de subastas

    const queryParams = new URLSearchParams();

    if (prendaId) queryParams.append("tipo_id", String(prendaId));  // Filtrar por tipo de prenda
    if (debouncedSearchQuery) queryParams.append("producto_nombre", encodeURIComponent(debouncedSearchQuery));  // Filtrar por nombre del producto
    if (talla) queryParams.append("tamano", encodeURIComponent(talla));  // Filtrar por talla
    if (estado) queryParams.append("estado_producto", String(estado));  // Filtrar por estado
    if (marca) queryParams.append("marca", String(marca));  // Filtrar por marca
    if (ordenPrecio) {
        queryParams.append("ordering", ordenPrecio);  // Ordenar por precio_inicial
    }
    const queryString = queryParams.toString();
    if (queryString) url += `?${queryString}`;

    console.log("URL construida de subasta:", url);


    const [result, setResult] = useState<Subasta[]>([]);  // Tipado de Subasta en lugar de Producto
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

                const json: Subasta[] = await res.json();  // Usamos el tipado correcto para Subasta
                console.log("Subastas ordenadas por precio:", json);
                setResult(json);
                setError(null);
            } catch (error: any) {
                setError(error.message || 'Error fetching auctions');
            } finally {
                setLoading(false);
            }
        })();
    }, [url, prendaId, debouncedSearchQuery, talla, estado, marca, ordenPrecio]);  // Añadir 'marca' y 'ordenPrecio' a la lista de dependencias

    return { result, loading, error };
}
