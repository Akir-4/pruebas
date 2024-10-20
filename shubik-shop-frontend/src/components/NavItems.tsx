import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { LogOut, User, Bell } from "lucide-react";
import Link from "next/link";
import { memo, useEffect, useState } from "react";  // Añadir useEffect y useState
import { useRouter } from "next/navigation";

const NavItems = memo(() => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);  // Estado para autenticación

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Elimina los tokens del localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Redirigir al usuario a la página de inicio de sesión
        router.push("/account");

        // Actualiza el estado de autenticación
        setIsAuthenticated(false);
    };

    // Verificar si el usuario está autenticado al montar el componente
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);  // Actualiza el estado según la presencia del token

        // Escuchar cambios en el almacenamiento local (para manejar cierre de sesión desde otras pestañas)
        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem("access_token");
            setIsAuthenticated(!!updatedToken);  // Actualiza el estado si el token cambia
        };

        window.addEventListener("storage", handleStorageChange);  // Escuchar el evento "storage"

        return () => {
            window.removeEventListener("storage", handleStorageChange);  // Limpia el listener al desmontar
        };
    }, []);

    // Definición de iconos en variables
    const BellIcon = <Bell aria-label="Notificaciones" />;
    const UserIcon = <User aria-label="Perfil de usuario" />;
    const LogOutIcon = <LogOut aria-label="Cerrar sesión" />;

    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    {/* Item de notificaciones */}
                    {isAuthenticated && (
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>{BellIcon}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>
                                    <p className="p-10">No tienes notificaciones</p>
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    )}

                    {/* Item de perfil de usuario */}
                    {isAuthenticated && (
                        <NavigationMenuItem>
                            <Link href="/buyer" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {UserIcon}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    )}

                    {/* Item de iniciar sesión o cerrar sesión */}
                    <NavigationMenuItem>
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className={navigationMenuTriggerStyle()}>
                                {LogOutIcon}
                                <span>Cerrar Sesión</span>
                            </button>
                        ) : (
                            <Link href="/account" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <span>Iniciar Sesión</span>
                                </NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
});

export default NavItems;
