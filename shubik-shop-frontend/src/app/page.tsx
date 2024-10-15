'use client'
// import AuctionsMainPage from "@/components/AuctionsMainPage";
import ListasSubastas from "@/components/ListasSubastas";
import AuctionsNavBar from "@/components/AuctionsNavBar";
// import { useGetAuctionsFiltered } from "../../hooks/getAuctionsFiltered";
import { useGetAuctionsFiltered } from "../../hooks/getAuctions";
import Filters from "@/components/filters";
import Image from "next/image";
import { useState } from "react";
import BannerMainPage from "@/components/banner";
export default function Home() {
  const [prendaId, setPrendaId] = useState<number | string>("");  // Cadena vacía para todos los productos
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para el término de búsqueda
  const [talla, setTalla] = useState<string>('');  // Búsqueda por talla
  const [estado, setEstado] = useState<number | string>("");  // Estado del producto
  const [marca, setMarca] = useState<number | string>("");  // Filtro por marca
  const [ordenPrecio, setOrdenPrecio] = useState<string>("");  // Orden por precio

  const { result: subastas, loading, error } = useGetAuctionsFiltered(prendaId, searchQuery, talla, estado, marca, ordenPrecio);

  return (
    <div className='flex flex-col bg-slate-100'>
      <AuctionsNavBar />

      {/* Grid para el layout principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
        {/* Banner y contenido principal */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <BannerMainPage />
          {/* <AuctionsMainPage productos={productos} error={error} loading={loading} /> */}
          <ListasSubastas subastas={subastas} loading={loading} error={error} />
        </div>

        {/* Filtros que cambian de posición en pantallas pequeñas */}
        <div className="col-span-1 h-full md:col-span-1 lg:h-screen lg:sticky top-1">
          <Filters
            setPrendaId={setPrendaId}
            setSearchQuery={setSearchQuery}
            setTalla={setTalla}
            setEstado={setEstado}
            setMarca={setMarca}
            setOrdenPrecio={(orden) => {
              console.log("Orden de precio seleccionado:", orden);
              setOrdenPrecio(orden);
            }}
          />
        </div>
      </div>
    </div>
  )
}