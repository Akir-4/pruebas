'use client'
// authContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    user: {
        nombre: string;
        email: string;
        usuario: string;
    } | null;
    login: (userData: { nombre: string; email: string; usuario: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; // Definir el tipo de children
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthContextType['user']>(null);

    const login = (userData: { nombre: string; email: string; usuario: string }) => {
        setUser(userData);
        localStorage.setItem('usuario', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('usuario');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children} {/* Renderiza los children */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
