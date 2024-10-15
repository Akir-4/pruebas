import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { LogOut, User, Bell } from "lucide-react"
import Link from "next/link"
import { memo } from "react"

// Uso de React.memo para evitar renderizados innecesarios
const NavItems = memo(() => {
    // Definición de iconos en variables
    const BellIcon = <Bell aria-label="Notificaciones" />;
    const UserIcon = <User aria-label="Perfil de usuario" />;
    const LogOutIcon = <LogOut aria-label="Cerrar sesión" />;

    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    {/* Item de notificaciones */}
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            {BellIcon}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink>
                                <p className="p-10">No tienes notificaciones</p>
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Item de perfil de usuario */}
                    <NavigationMenuItem>
                        <Link href="/buyer" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {UserIcon}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    {/* Item de cerrar sesión */}
                    <NavigationMenuItem>
                        <Link href="/logout" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {LogOutIcon}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
})

export default NavItems;
