'use client'

import { CategoryComboBox } from "./CategoryComboBox"
import { FilterByCheckBox } from "./FilterByCheckBox"
import FilterByRadioGroup from "./FilterByRadioGroup"
import { SearchAuction } from "./SearchAuction"
import { Label } from "./ui/label"
import React, { useState, useEffect } from "react"
interface FiltersProps {
  setPrendaId: (id: number | string) => void;  // Permitir que sea número o cadena vacía
  setSearchQuery: (nombre: string) => void;
  setTalla: (nombre: string) => void;
  setEstado: (estado: number | string) => void;
  setMarca: (id: number | string) => void;  // Añadir marca
  setOrdenPrecio: (orden: string) => void;  // Añadir orden de precio


}
const Filters: React.FC<FiltersProps> = ({ setPrendaId, setSearchQuery, setTalla, setEstado, setMarca, setOrdenPrecio }) => {
  const [marcas, setMarcas] = useState<{ marca_id: number; marca: string }[]>([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedTalla, setSelectedTalla] = useState(""); // Estado local para la talla
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedOrdenPrecio, setSelectedOrdenPrecio] = useState("");  // Estado local para el orden de precio

  useEffect(() => {
    async function fetchMarcas() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos/marcas/`);
      const data = await res.json();
      setMarcas(data);  // Asumiendo que la respuesta es un array de marcas
      console.log('datos de marca ', data);
    }

    fetchMarcas();
  }, []);

  console.log("Marcas state:", marcas);

  const handleTallaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const talla = event.target.value;
    setSelectedTalla(talla);  // Actualizar el estado local
    setTalla(talla);          // Pasar la talla seleccionada al componente padre
  };

  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const estado = event.target.value;
    setSelectedEstado(estado);  // Actualizar el estado local
    setEstado(estado);          // Pasar el estado seleccionado al componente padre
  };

  const handleMarcaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const marca = event.target.value;
    console.log("Marca seleccionada:", marca);  // Verifica que está seleccionando el valor correcto
    setSelectedMarca(marca);
    setMarca(marca);  // Pasar la marca seleccionada al componente padre
  };


  return (

    /*Apartado de filtros*/

    <div className=" flex flex-col items-center">
      <form className="flex flex-col" action="" method="get">
        <div className="flex flex-col md:flex-row md:justify-end ">

          <div className="mb-4 flex flex-col gap-2">
            <h3>Filtros</h3>
            <SearchAuction onSearch={setSearchQuery} />

            <div className="flex flex-col">
              <Label className="mb-3" htmlFor="categories">Tipo Prenda</Label>
              <select className="rounded-lg p-3" onChange={(e) => setPrendaId(Number(e.target.value))}>  {/* Llamar a setPrendaId al cambiar */}
                <option value="">Todas las prendas</option>
                <option className="capitalize" value='1'>Polera</option>
                <option value="2">Camisa</option>
                <option value="3">Pantalon</option>
                <option value="4">Chaqueta</option>
              </select>
            </div>

            <div className="flex flex-col">
              <Label className="mb-3">Talla</Label>
              <select className="rounded-lg p-3" onChange={handleTallaChange} value={selectedTalla}>
                <option value="">Todas las Tallas</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
            </div>

            <div className="flex flex-col">
              <Label className="mb-3">Estado</Label>
              <select className="rounded-lg p-3" onChange={handleEstadoChange} value={selectedEstado}>
                <option value="">Todos los Estados</option>
                <option value="1">Nuevo con Etiqueta</option>
                <option value="2">Nuevo sin Etiqueta</option>
                <option value="3">Como Nuevo</option>
                <option value="4">Muy Buen Estado</option>
                <option value="5">Buen Estado</option>
                <option value="6">Aceptable</option>
                <option value="7">Desgastado</option>
              </select>
            </div>
            <div className="flex flex-col">
              <Label className="mb-3">Marcas</Label>
              <select className="rounded-lg p-3" onChange={handleMarcaChange} value={selectedMarca}>
                <option value="">Todas las Marcas</option>
                {marcas.map((marca) => (
                  <option key={marca.marca_id} value={marca.marca_id}>{marca.marca}</option>

                ))}
              </select>
            </div>

            <div className="mb-4 flex flex-col">
              <Label className="mb-3" htmlFor="categories">Precio</Label>
              <FilterByRadioGroup setOrdenPrecio={setOrdenPrecio} />
            </div>

          </div>


        </div>




      </form>


    </div>
  )
}

export default Filters
