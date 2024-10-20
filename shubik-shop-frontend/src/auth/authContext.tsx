import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Definir la forma del contexto de autenticación
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

// Crear el contexto con un valor inicial por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Proveedor de autenticación que envuelve toda la aplicación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Simular el login al obtener el token del localStorage
    const login = () => {
        localStorage.setItem('access_token', 'dummy-token'); // Simulación de login
        setIsAuthenticated(true);
    };

    // Cerrar sesión removiendo el token
    const logout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
    };

    // Verificar el estado de autenticación al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
