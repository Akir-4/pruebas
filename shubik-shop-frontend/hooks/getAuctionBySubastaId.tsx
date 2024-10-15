import { useEffect, useState } from "react";
import { Subasta } from "../types/subasta";  // Asegúrate de importar el tipo correcto

export function useGetAuctionBySubastaId(subastaId: number) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/compras/subastas/${subastaId}`;
    const [result, setResult] = useState<Subasta | null>(null);  // Aplica el tipo de Subasta o null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
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
