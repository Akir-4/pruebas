'use client';

import { useParams } from 'next/navigation';
import { useGetAuctionBySlug } from '../../../../../hooks/getAuctionBySlug';
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
    return (
        <div className='flex flex-col p-4 mx-auto w-full bg-slate-100 gap-5'>

            <Card className='flex flex-col justify-center items-center text-center'>
                <CardTitle className='capitalize p-4 '>{productoData.nombre}</CardTitle>
                <CardContent className='flex flex-col md:flex-row gap-8'>
                    <Carousel>
                        <CarouselContent>
                            {
                                images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <img className='w-[150px] h-[150px] md:w-[500px] md:h-[500px] rounded-lg mx-auto' src={image} alt={`Imagen ${index + 1} de ${productoData.nombre}`} />
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>

                    </Carousel>

                    <div>
                        <Tag
                            className='flex justify-center gap-6 md:gap-32 mt-4'
                            brand={productoData.marca_nombre}
                            size={productoData.tamano}
                            type={productoData.tipo_nombre}
                        />



                        <div className='w-[70%] mx-auto'>
                            <h3 className='text-4xl mt-8 capitalize'>Oferta mas alta: {formatPriceCLP(productoData.precio_ofertado)}</h3>
                            <div className='flex flex-col justify-center items-center gap-3 mt-4'>
                                <Input className='w-1/2 text-center' type='number' placeholder={formatPriceCLP(productoData.precio_ofertado).toString()} />
                                <Button className='w-1/2'>Ofertar</Button>
                            </div>

                            <p className='text-slate-500 italic'>Precio inicial: {formatPriceCLP(productoData.precio_inicial)}</p>

                            <div className='md:mt-24'>
                                <h3 className='text-4xl font-light mb-2'>Descripción</h3>
                                <Separator className='mb-4' />

                                <p className='md:text-left text-center'>{productoData.descripcion}</p>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
            <h3 className='capitalize text-center text-3xl font-extralight'>lista de ofertas</h3>
            <Separator />
            <OfferTable productoId={productoData.producto_id} />
        </div>
    );
};

export default AuctionDetail;
