import { useEffect, useState } from "react";
import { Producto } from "../types/auction"; // Ajusta la ruta según tu estructura de carpetas

export function useGetAuctionsByNombre(nombreProducto: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos/productos?nombre=${nombreProducto}`;

    const [result, setResult] = useState<Producto[]>([]); // Utilizamos tu tipado de Producto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);

                // Verificar si la respuesta fue exitosa
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const json: Producto[] = await res.json(); // Usamos el tipado correcto
                setResult(json);
                setError(null); // Limpiar cualquier error anterior
            } catch (error: any) {
                setError(error.message || 'Hubo un error al obtener las subastas');
            } finally {
                setLoading(false);
            }
        })();
    }, [url, nombreProducto]);

    return { result, loading, error };
}
