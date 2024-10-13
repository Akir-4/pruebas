import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchAuctionProps {
  onSearch: (query: string) => void;  // Recibe una función para manejar la búsqueda
}

export function SearchAuction({ onSearch }: SearchAuctionProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");  // Estado local para el input


  const handleSearch = (e: any) => {
    onSearch(searchQuery);  // Pasar el valor ingresado al componente padre
    //testeo de funcion
    console.log("Buscando por nombre:", searchQuery);
    //previene que se actualice la pagina
    e.preventDefault()
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Buscar Subastas"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  // Actualizar el estado con el valor del input
      />
      <Button onClick={handleSearch}><Search /></Button>
    </div>
  );
}
