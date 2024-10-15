'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { useRouter } from "next/navigation"
import { formatPriceCLP } from "@/lib/formatPriceCLP"
import Image from "next/image" // Cambiamos a Image de Next.js
import imgDefault from '@/public/noImg.png'
import React from 'react'
import { Subasta } from '../../types/subasta'
import "../../src/app/globals.css"

// Creacion de los props para recibir datos externos

interface ListaSubastasProps {
    subastas: Subasta[];
    loading: boolean;
    error: string | null;
}

const ListasSubastas: React.FC<ListaSubastasProps> = ({ subastas, loading, error }) => {
    const router = useRouter()
    const defaultImage = imgDefault
    //Probamos si estan listando las subastas
    console.log('marca de productos ', subastas)
    //En caso de ocurrir algun error, mostrar mensaje
    if (error) {
        return <p>Error al cargar las subastas: {error}</p>;
    }

    return (
        <div className="md:grid md:grid-cols-3 gap-2 ">
            {/* Mostrar un parrafo de carga mientras espera los datos del backend */}
            {loading && <p>Cargando....</p>}

            {!loading && subastas.length === 0 && (
                <div className="w-1/2 flex flex-col justify-center items-center mx-auto">
                    <p className="text-xl mb-4">No hay subastas disponibles para este filtro....</p>
                    <Image src={imgDefault} alt="errorImage" width={150} height={150} />
                </div>
            )}

            {/* Ejecutar map de los datos siempre y cuando productos sea distinto a null */}

            {subastas != null && subastas.map((subasta: Subasta, index: number) => {
                {/*Desctructuracion de la subasta */ }

                console.log('lista de subastas op ', subasta)
                const {
                    subasta_id,
                    producto: {
                        producto_id,
                        nombre,
                        marca: { marca },
                        tipo_prenda: { tipo },
                        estado,
                        slug,
                        tamano,
                        imagen_1,
                        precio_inicial,
                    },
                    fecha_inicio,
                    fecha_termino

                } = subasta

                const bgColor = estado === 1 ? 'bg-[#228B22] text-white' :
                    estado === 2 ? 'bg-[#3CB371]' :
                        estado === 3 ? 'bg-[#4682B4] text-white' :
                            estado === 4 ? 'bg-[#5F9EA0]' :
                                estado === 5 ? 'bg-[#9370DB]' :
                                    estado === 6 ? 'bg-[#B0C4DE]' :
                                        estado === 7 ? 'bg-[#708090]' :
                                            estado;

                const focusColor = estado === 1 ? 'hover:bg-[#228B22] hover:text-white' :
                    estado === 2 ? 'hover:bg-[#3CB371]' :
                        estado === 3 ? 'hover:bg-[#4682B4] hover:text-white' :
                            estado === 4 ? 'hover:bg-[#5F9EA0]' :
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
                        key={subasta_id ? subasta_id : `subasta -${index}`} // Usamos productoId o fallback al index
                        className={`mt-4 ${focusColor} transition-colors cursor-pointer shadow-lg  p-0`}
                        onClick={() => router.push(`/subastas/${subasta_id}`)}
                    >
                        <CardTitle className="text-left text-3xl capitalize  line-clamp-2 p-3">
                            {nombre}
                        </CardTitle>
                        <CardContent className="p-0 mt-4">
                            {/*Caracteristicas del producto */}
                            <div className="flex flex-col justify-between mb-4">
                                {/*Nombre, Marca, Tipo de prenda y Talla */}
                                <div className="flex justify-between w-full">
                                    <div className="p-3">
                                        <h2 className="text-2xl font-extralight">{marca}</h2>
                                        <h3 className="text-2xl font-thin">{tipo} {tamano}</h3>
                                    </div>

                                    <div className="p-3">
                                        <p className="text-5xl font-sans font-thin">{formatPriceCLP(precio_inicial)}</p>
                                        <p className="capitalize font-light text-sm">precio inicial</p>
                                    </div>
                                </div>
                                {/*Fechas de inicio y termino de subasta */}
                                <div className="flex justify-between w-full" >
                                    <div className="px-3">
                                        <p className="text-l font-sans font-thin">{fecha_inicio}</p>
                                        <p className="capitalize font-light text-sm">Fecha inicio</p>
                                    </div>

                                    <div className="px-3">
                                        <p className="text-l font-sans font-thin">{fecha_termino}</p>
                                        <p className="capitalize font-light text-sm">Fecha termino</p>
                                    </div>
                                </div>

                            </div>
                            {/*Separador con informacion de estado*/}
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

export default ListasSubastas