import { Producto } from "./auction";

export interface Subasta {
    subasta_id: number;
    producto_id: Producto; // Relacionado con el producto que está siendo subastado
    fecha_inicio: string;  // O 'Date' si luego la conviertes
    fecha_termino: string; // O 'Date' si luego la conviertes
    estado: string;
}