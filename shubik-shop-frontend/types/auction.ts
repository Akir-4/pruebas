// Definir la interfaz Marca
export interface Marca {
    marca_id: number;
    marca: string;
}

// Definir la interfaz TipoPrenda
export interface TipoPrenda {
    tipo_id: number;
    tipo: string;
}

// Definir la interfaz Usuario
export interface Usuario {
    usuario_id: number;
    nombre: string;
}

// Definir la interfaz Producto que incluye las relaciones
export interface Producto {
    producto_id: number;
    nombre: string;
    marca_id: number;          // ID de la marca
    marca_nombre: string;      // Nombre de la marca
    tipo_id: number;           // ID del tipo de prenda
    tipo_nombre: string;       // Nombre del tipo de prenda
    usuario_id: number;        // ID del usuario
    usuario_nombre: string;    // Nombre del usuario
    estado: number;            // Estado del producto (ej: "Nuevo", "Usado")
    tamano: string;            // Tamaño del producto (ej: "M", "L", etc.)
    precio_inicial: number;    // Precio inicial del producto
    precio_ofertado: number;   // Precio ofertado del producto
    imagen_1: string;
    imagen_2: string | null;
    imagen_3: string | null;
    imagen_4: string | null;     // Ruta a la imagen del producto
    slug: string;              // Slug del producto
    descripcion: string | null; // Descripción del producto
    images: [];
}
