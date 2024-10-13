import { useEffect, useState } from "react";
import { Puja } from "../types/Puja";
import { Producto } from "../types/auction";

export function useGetProductoConPujas(productoId: number) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos/producto/${productoId}/detalles_pujas/`;
    const [pujas, setPujas] = useState<Puja[]>([]);
    const [producto, setProducto] = useState<Producto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const json = await res.json();
                setProducto(json.producto); // Establece los detalles del producto
                setPujas(json.pujas); // Establece las pujas relacionadas
                setError(null);
            } catch (error: any) {
                setError(error.message || 'Hubo un error al obtener los datos');
            } finally {
                setLoading(false);
            }
        })();
    }, [url, productoId]);

    return { producto, pujas, loading, error };
}
