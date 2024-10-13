export const formatPriceCLP = (price: number): string => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0, // CLP no tiene decimales
    }).format(price);
};