'use client';

import { useParams } from 'next/navigation';
import { useGetAuctionBySlug } from '../../../../../hooks/getAuctionBySlug';
import { useGetProductoConPujas } from '../../../../../hooks/getPujasByProductoId';
import { Producto } from '../../../../../types/auction';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { formatPriceCLP } from '@/lib/formatPriceCLP';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Tag from '@/components/shared/TagsClothes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import 'animate.css'
import OfferTable from '@/components/shared/OfferTable';
import Fade from 'embla-carousel-fade'
import { User } from 'lucide-react';
import { Label } from '@/components/ui/label';

const AuctionDetail = () => {
    const params = useParams();
    let slug = params.slug;

    // Si slug es un array, obtenemos el primer valor
    if (Array.isArray(slug)) {
        slug = slug[0];
    }

    // Evitar que el hook se ejecute si slug es undefined
    const { result: producto, loading, error } = useGetAuctionBySlug(slug || '');

    if (loading) {
        return <p>Cargando producto...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!producto) {
        return <p>Producto no encontrado.</p>;
    }

    // Aseguramos el tipado del producto
    const productoData = producto as Producto;
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';  // Obtén la URL del backend



    // Filtra solo las imágenes que no sean null
    const images = productoData.images
        .filter(image => image !== null)  // Filtra las imágenes que no son null
        .map(image => `${baseUrl}${image}`);  // Añade la URL base

    const estadoTexto = productoData.estado === 1 ? 'Nuevo con Etiqueta' :
        productoData.estado === 2 ? 'Nuevo sin Etiqueta' :
            productoData.estado === 3 ? 'Como Nuevo' :
                productoData.estado === 4 ? 'Muy Buen Estado' :
                    productoData.estado === 5 ? 'Buen Estado' :
                        productoData.estado === 6 ? 'Estado Aceptable' :
                            productoData.estado === 7 ? 'Estado Desgastado' :
                                productoData.estado;

    const bgColor = productoData.estado === 1 ? 'bg-[#228B22] text-white' :
        productoData.estado === 2 ? 'bg-[#3CB371]' :
            productoData.estado === 3 ? 'bg-[#4682B4] text-white' :
                productoData.estado === 4 ? 'bg-[#5F9EA0]' :
                    productoData.estado === 5 ? 'bg-[#9370DB]' :
                        productoData.estado === 6 ? 'bg-[#B0C4DE]' :
                            productoData.estado === 7 ? 'bg-[#708090]' :
                                productoData.estado;

    return (
        <div className='flex flex-col p-4 mx-auto w-full bg-slate-100 gap-5'>
            <Card>
                <CardTitle></CardTitle>
                <CardContent>
                    <div className='md:grid md:grid-cols-2 p-3'>

                        <div className='md:col-span-1'>
                            <Carousel plugins={[
                                Fade({
                                    active: true
                                }),
                            ]}
                            >
                                <CarouselContent className='object-cover'>
                                    {images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img src={image} alt="" />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>

                        <div className='col-span-1 text-left text-2xl '>
                            <h1 className='text-left text-3xl capitalize'>{productoData.nombre}</h1>
                            <h2 className='mt-4 font-extralight'>{productoData.marca_nombre}</h2>
                            <h3 className='font-extralight'>{productoData.tipo_nombre} {productoData.tamano}</h3>

                            <textarea className='w-full p-3 resize-none rounded-xl shadow-lg mt-8' readOnly disabled >{productoData.descripcion}</textarea>

                            <div className='mt-3'>
                                <p>{productoData.usuario_nombre}</p>
                            </div>

                            <div className={`${bgColor} py-3 flex flex-col items-center justify-center mt-4`}>
                                <p>{estadoTexto}</p>
                            </div>

                            <div className='flex items-center justify-center mt-8 gap-20'>
                                <div>
                                    <p className='text-5xl font-extralight'>{formatPriceCLP(productoData.precio_ofertado)}</p>
                                    <p className='capitalize text-sm text-gray-400'>oferta mas alta</p>
                                </div>

                                <div className='text-gray-400'>
                                    <p className='text-5xl font-extralight'>{formatPriceCLP(productoData.precio_inicial)}</p>
                                    <p className='capitalize text-sm text-gray-400'>precio inicial</p>
                                </div>
                            </div>

                            <div className='flex flex-col items-center md:mx-auto justify-center mt-4 md:w-[50%]'>
                                <Label className='capitalize text-3xl font-extralight mb-3'>publica tu oferta</Label>
                                <Input type='number' className='text-center text-3xl' placeholder={formatPriceCLP(productoData.precio_ofertado + 1000)} />
                                <Button className='w-full mt-3 py-7 md:py-3'>Ofertar</Button>
                            </div>
                        </div>





                    </div>
                </CardContent>
            </Card>



        </div>
    );
};

export default AuctionDetail;
