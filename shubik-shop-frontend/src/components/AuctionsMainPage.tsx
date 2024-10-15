'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Separator } from "./ui/separator"
import { useRouter } from "next/navigation"
import Tag from "./shared/TagsClothes"
import Title from "./shared/Title"
import { ResponseType } from "../../types/response"
import { formatPriceCLP } from "@/lib/formatPriceCLP"
import Image from "next/image" // Cambiamos a Image de Next.js
import { Producto } from "../../types/auction"
import TagNoLabel from "./shared/TagsNoLabel"
import imgDefault from '@/public/noImg.png'
import "../../src/app/globals.css"
interface AuctionsMainPageProps {
  productos: Producto[];
  loading: boolean;
  error: string | null;
}

const AuctionsMainPage: React.FC<AuctionsMainPageProps> = ({ productos, loading, error }) => {
  // Traer los datos de la API para listar las subastas

  const router = useRouter()

  //Imagen predeterminada en caso de que un producto no tenga

  const defaultImage = imgDefault
  console.log(defaultImage)
  console.log(productos)
  // Si hay un error, lo mostramos
  if (error) {
    return <p>Error al cargar las subastas: {error}</p>;
  }



  return (
    <div className="md:grid md:grid-cols-3 gap-2 ">
      {/* Mostrar un parrafo de carga mientras espera los datos del backend */}
      {loading && <p>Cargando....</p>}

      {!loading && productos.length === 0 && (
        <div className="w-1/2 flex flex-col justify-center items-center mx-auto">
          <p className="text-xl mb-4">No hay productos disponibles para este filtro....</p>
          <Image src={imgDefault} alt="errorImage" width={150} height={150} />
        </div>
      )}

      {/* Ejecutar map de los datos siempre y cuando productos sea distinto a null */}

      {productos != null && productos.map((subasta: Producto, index: number) => {
        // Destructuración de los datos de la subasta

        const {
          producto_id,
          nombre,
          marca_nombre,
          tipo_nombre,
          usuario_nombre,
          estado,
          slug,
          tamano,
          imagen_1,
          precio_inicial,
          precio_ofertado,
          descripcion = 'El usuario no dio una descripción a este producto...'
        } = subasta;

        console.log('imagen = ', imagen_1)

        const bgColor = estado === 1 ? 'bg-[#228B22] text-white' :
          estado === 2 ? 'bg-[#3CB371]' :
            estado === 3 ? 'bg-[#4682B4] text-white' :
              estado === 4 ? 'bg-[#5F9EA0] text-white' :
                estado === 5 ? 'bg-[#9370DB]' :
                  estado === 6 ? 'bg-[#B0C4DE]' :
                    estado === 7 ? 'bg-[#708090]' :
                      estado;

        const focusColor = estado === 1 ? 'hover:bg-[#228B22] hover:text-white' :
          estado === 2 ? 'hover:bg-[#3CB371]' :
            estado === 3 ? 'hover:bg-[#4682B4] hover:text-white' :
              estado === 4 ? 'hover:bg-[#5F9EA0] hover:text-white' :
                estado === 5 ? 'hover:bg-[#9370DB]' :
                  estado === 6 ? 'hover:bg-[#B0C4DE]' :
                    estado === 7 ? 'hover:bg-[#708090]' :
                      estado;


        const estadoTexto = estado === 1 ? 'Nuevo con Etiqueta' :
          estado === 2 ? 'Nuevo sin Etiqueta' :
            estado === 3 ? 'Como Nuevo' :
              estado === 4 ? 'Muy Buen Estado' :
                estado === 5 ? 'Buen Estado' :
                  estado === 6 ? 'Estado Aceptable' :
                    estado === 7 ? 'Estado Desgastado' :
                      estado;

        return (
          <Card
            key={producto_id ? producto_id : `subasta-${index}`} // Usamos productoId o fallback al index

            className={`mt-4 ${focusColor} transition-colors cursor-pointer shadow-lg  p-0`}
            onClick={() => router.push(`/productos/${slug}`)}
          >
            <CardTitle className="text-left text-3xl capitalize  line-clamp-2 p-3">{nombre}</CardTitle>
            <CardContent className="p-0 mt-4">
              <div className="flex justify-between mb-4">
                <div className="p-3">
                  <h2 className="text-2xl font-extralight">{marca_nombre}</h2>
                  <h3 className="text-2xl font-thin">{tipo_nombre} {tamano}</h3>
                </div>

                <div className="p-3">
                  <p className="text-5xl font-sans font-thin">{formatPriceCLP(precio_inicial)}</p>
                  <p className="capitalize font-light text-sm">precio inicial</p>
                </div>
              </div>

              <p className={`py-1 font-bold text-center ${bgColor}`}>
                {estadoTexto}
              </p>

              <div className="w-full p-1">
                <div className=" image-container w-full h-[250px] ">
                  <img
                    className=" mx-auto w-full h-full object-contain "
                    alt=""
                    src={imagen_1}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default AuctionsMainPage