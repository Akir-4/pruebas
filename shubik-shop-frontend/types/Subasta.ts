import { Producto } from './auction';
import { Puja } from './Puja';
export interface Subasta {
    subasta_id: number;
    producto: Producto;       // Relación con el producto
    fecha_inicio: string;      // Fecha de inicio de la subasta
    fecha_termino: string;     // Fecha de término de la subasta
    estado: string;            // Estado de la subasta (ej: "Activa", "Finalizada")
    pujas: Puja[];             // Lista de pujas relacionadas con esta subasta
}
