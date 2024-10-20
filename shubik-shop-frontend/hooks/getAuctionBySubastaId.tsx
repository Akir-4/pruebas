import { useEffect, useState } from "react";
import { Subasta } from "../types/Subasta";

export function useGetAuctionBySubastaId(subastaId: number) {

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/compras/subastas/${subastaId}`;
    const [result, setResult] = useState<Subasta | null>(null);  // Aplica el tipo de Subasta o null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            // Obtener el token almacenado en localStorage o sessionStorage
            const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');

            try {
                const res = await fetch(url, {
                    method: 'GET', // O el método que estés utilizando
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`  // Agregar el token al header
                    }
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }

                const json: Subasta = await res.json();  // Asegúrate de que el resultado siga el tipo Subasta
                setResult(json);
                console.log('Respuesta de la API:', json);
            } catch (error: any) {
                setError(error.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        })();
    }, [subastaId]);

    return { result, loading, error };
}
