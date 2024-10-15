"use client";
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import NavItems from './NavItems';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';

const NavBar = () => {
  const menuIcon = <Menu size={24} aria-label="Abrir menú" />;
  const crossIcon = <X size={24} aria-label="Cerrar menú" />;

  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el Menú desplegable para vistas mobile

  const router = useRouter();
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
          {isOpen ? crossIcon : menuIcon}
        </Button>
      </div>

      {/* NavItems Vistas Desktop */}
      <div className="hidden md:flex items-center space-x-6">
        <NavItems />
      </div>

      {/* NavItems en vista móvil */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">
          <div className="flex flex-col items-center p-4 space-y-4">
            <NavItems />
            {/* Al hacer clic en un ítem, cerrar el menú */}
            <Button onClick={closeMenu} className='text-gray-800'>
              Cerrar Menú
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
