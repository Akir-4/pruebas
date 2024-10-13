import { usuario } from './user'
import { Subasta } from './Subasta';
export interface Puja {
    puja_id: number;
    subasta_id: Subasta;   // Relacionado con la subasta
    usuario_id: usuario;   // Relacionado con el usuario que hace la puja
    monto: number;
    fecha: string;  // O Date si luego la conviertes
}