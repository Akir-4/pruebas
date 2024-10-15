import { useEffect, useState } from 'react';
import { Subasta } from '../types/Subasta';
export function useGetAuctionByProductId(productId: number) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/compras/subastas/?producto_id=${productId}`;  // Endpoint que trae la subasta por producto_id
    const [subasta, setSubasta] = useState<Subasta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!productId) {
            setError("No se ha proporcionado un ID de producto válido");
            setLoading(false);
            return;
        }

        const fetchAuction = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const json: Subasta = await res.json();
                setSubasta(json);
            } catch (error: any) {
                setError(error.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [productId]);

    return { subasta, loading, error };
}
