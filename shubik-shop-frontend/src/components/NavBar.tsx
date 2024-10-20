"use client";
import { Menu, X, LogIn } from 'lucide-react'; // Importa el ícono de login
import { useRouter, usePathname } from 'next/navigation'; // usePathname para obtener la ruta actual
import NavItems from './NavItems';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el Menú desplegable para vistas mobile
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para el inicio de sesión

  const router = useRouter();
  const pathname = usePathname(); // Obtiene la ruta actual

  // Función para verificar si el usuario ha iniciado sesión
  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Verifica si hay un token en el localStorage
    if (token) {
      setIsAuthenticated(true); // Si hay un token, consideramos que está autenticado
    } else {
      setIsAuthenticated(false); // Si no, no está autenticado
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    router.push('/');
  }, [router]);

  // Función para alternar el menú móvil
  const toggleMenu = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  // Función para cerrar el menú cuando se selecciona una opción en mobile
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className="flex items-center justify-between p-6 bg-white shadow-md">
      {/* Logo y nombre */}
      <div
        className="cursor-pointer flex items-center space-x-2"
        onClick={handleLogoClick}
      >
        <h1 className="font-black text-3xl text-gray-800">SHUBIK SHOP</h1>
      </div>

      {/* Botón Hamburguesa para vistas mobile */}
      <div className='md:hidden flex items-center'>
        <Button onClick={toggleMenu} className='text-gray-800 focus:outline-none'>
          {isOpen ? <X size={24} aria-label="Cerrar menú" /> : <Menu size={24} aria-label="Abrir menú" />}
        </Button>
      </div>

      {/* NavItems Vistas Desktop */}
      <div className="hidden md:flex items-center space-x-6">
        {isAuthenticated ? (
          <NavItems /> // Mostrar los ítems si está autenticado
        ) : (
          // Mostrar icono de login si no está autenticado y no está en la página de login
          pathname !== '/account' && (
            <Button
              onClick={() => router.push('/account')}
              className="flex items-center space-x-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <LogIn size={24} aria-label="Iniciar sesión" />
              <span>Iniciar Sesión</span>
            </Button>
          )
        )}
      </div>

      {/* NavItems en vista móvil */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">
          <div className="flex flex-col items-center p-4 space-y-4">
            {isAuthenticated ? (
              <>
                <NavItems /> {/* Muestra los elementos del menú si está autenticado */}
                <Button onClick={closeMenu} className='text-gray-800'>
                  Cerrar Menú
                </Button>
              </>
            ) : (
              // Mostrar icono de login en menú móvil
              pathname !== '/account' && (
                <Button
                  onClick={() => { router.push('/account'); closeMenu(); }}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center space-x-2"
                >
                  <LogIn size={24} aria-label="Iniciar sesión" />
                  <span>Iniciar Sesión</span>
                </Button>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
