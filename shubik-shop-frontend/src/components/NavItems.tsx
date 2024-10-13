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
import { LogOut, User } from "lucide-react"
import { Bell } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { memo } from "react"


//Uso de React.memo para evitar renderizados innecesarios
const NavItems = memo(() => {
    //Definicion de iconos en variables 
    const BellIcon = <Bell />;
    const UserIcon = <User />;
    const LogOutIcon = <LogOut />;



    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
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

                    <NavigationMenuItem>
                        <Link href="/user" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {UserIcon}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

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

export default NavItems
