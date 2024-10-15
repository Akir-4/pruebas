export interface Usuario {
    usuario_id: number; // ID del usuario
    nombre: string; // Nombre del usuario
    email: string; // Correo electrónico del usuario
    telefono: string; // Teléfono del usuario
    direccion?: string; // Dirección (opcional)
    imagen?: string; // Imagen del usuario (opcional)
}

export interface LoginCredentials {
    usuario: string;
    contrasena: string;
}