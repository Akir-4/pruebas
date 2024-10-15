import { Usuario } from './user';

export interface Puja {
    puja_id: number;
    monto: number;             // Monto de la puja
    fecha: string;             // Fecha en que se realizó la puja
    usuario: Usuario;          // Usuario que realizó la puja
}