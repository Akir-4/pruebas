import { Puja } from "../../types/Puja";

// Función para hacer la petición POST de una nueva puja
export async function submitBid(subastaId: number, offer: Puja['monto'], token: string): Promise<Puja> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/compras/subastas/${subastaId}/pujas`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ monto: offer })  // Enviamos el monto de la puja
        });

        if (!response.ok) {
            throw new Error(`Error al realizar la oferta: ${response.status}`);
        }

        const result: Puja = await response.json();  // Tipamos la respuesta como Puja
        console.log('Puja realizada con éxito:', result);
        return result;  // Devolvemos el resultado tipado como Puja
    } catch (error) {
        console.error('Error en la petición de oferta:', error);
        throw error;
    }
}
