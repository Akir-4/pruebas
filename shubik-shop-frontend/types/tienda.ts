export interface Tienda {
    nombre_legal: string;
    razon_social?: string;     // Razón social (opcional)
    rut: string;
    sector: string;
    tamano_empresa: string;    // Ejemplo: "Pequeña", "Mediana"
    direccion_fisica: string;
    telefono_principal: string;
    correo_electronico: string;
}