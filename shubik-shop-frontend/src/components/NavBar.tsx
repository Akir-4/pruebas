'use client';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import NavItems from './NavItems';
import { useCallback, useState } from 'react';
import { Button } from './ui/button';

const NavBar = () => {
  const menuIcon = <Menu size={24} />
  const crossIcon = <X size={24} />

  const [isOpen, setIsOpen] = useState(false)// Estado para controlar el Menú desplegable para vistas mobile

  const router = useRouter();
  const handleLogoClick = useCallback(() => {
    router.push('/');
  }, [router]);

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }


  return (
    <nav className="flex items-center justify-between p-6 bg-white shadow-md">
      {/* Logo y nombre */}
      <div
        className="cursor-pointer flex items-center space-x-2"
        onClick={handleLogoClick}
      >
        <h1 className="font-black text-3xl text-gray-800">SHUBIK SHOP</h1>
      </div>

      {/*Boton Hamburguesa para vistas mobile */}

      <div className='md:hidden flex items-center'>
        <Button onClick={toggleMenu} className='text-white focus:outline-none'>
          {isOpen ? crossIcon : menuIcon}
        </Button>
      </div>
      {/* NavItems Vistas Desktop */}
      <div className="hidden md:flex items-center space-x-6">
        <NavItems />
      </div>

      {/* NavItems vistas mobile */}
      <div className={`absolute top-16 right-0 w-full flex items-center justify-center bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <NavItems />
      </div>



    </nav>
  );
};

export default NavBar;
