'use client'
import { useParams } from 'next/navigation';  // Para obtener los parámetros dinámicos en Next.js
import { useGetAuctionBySubastaId } from '../../../../../hooks/getAuctionBySubastaId';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Fade from 'embla-carousel-fade'
import { Label } from '@/components/ui/label';
import { formatPriceCLP } from '@/lib/formatPriceCLP';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
const AuctionDetailsPage = () => {
    const params = useParams();  // Asegúrate de obtener los params de la URL
    const subastaIdStr = Array.isArray(params.subastaId) ? params.subastaId[0] : params.subastaId;
    const subastaId = parseInt(subastaIdStr);  // Convertir a número
    const { result: subasta, loading, error } = useGetAuctionBySubastaId(subastaId);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!subasta) {
        return <div>No se encontró la subasta</div>;
    }

    const {
        estado: estadoSubasta,
        fecha_inicio,
        fecha_termino,
        producto: {
            nombre: nombreProducto,
            descripcion,
            estado: estadoProducto,
            tamano,
            imagen_1,
            imagen_2,
            imagen_3,
            imagen_4,
            marca: { marca } = {},
            tipo_prenda: { tipo } = {},
            tienda: { nombre_legal } = {},
            precio_inicial,
            precio_ofertado,
        },
        pujas = [],  // Valor por defecto de array vacío
    } = subasta || {};

    const imagenes = [imagen_1, imagen_2, imagen_3, imagen_4].filter(image => image !== null);
    console.log(imagenes)

    const estadoTexto = estadoProducto === 1 ? 'Nuevo con Etiqueta' :
        estadoProducto === 2 ? 'Nuevo sin Etiqueta' :
            estadoProducto === 3 ? 'Como Nuevo' :
                estadoProducto === 4 ? 'Muy Buen Estado' :
                    estadoProducto === 5 ? 'Buen Estado' :
                        estadoProducto === 6 ? 'Estado Aceptable' :
                            estadoProducto === 7 ? 'Estado Desgastado' :
                                estadoProducto;

    const bgColor = estadoProducto === 1 ? 'bg-[#228B22] text-white' :
        estadoProducto === 2 ? 'bg-[#3CB371]' :
            estadoProducto === 3 ? 'bg-[#4682B4] text-white' :
                estadoProducto === 4 ? 'bg-[#5F9EA0] text-white' :
                    estadoProducto === 5 ? 'bg-[#9370DB]' :
                        estadoProducto === 6 ? 'bg-[#B0C4DE]' :
                            estadoProducto === 7 ? 'bg-[#708090]' :
                                estadoProducto;
    return (

        <div className='flex flex-col p-4 mx-auto w-full bg-slate-100 gap-5'>
            <Card className='md:w-[85%] md:mx-auto'>
                <CardContent>
                    <div className='md:grid md:grid-cols-2 gap-4 p-3'>
                        <div className='md:col-span-1'>
                            {imagenes.length > 0 ? (
                                <Carousel plugins={[Fade({ active: true })]}>
                                    <CarouselContent>
                                        {imagenes.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <img
                                                    src={image}
                                                    alt={`Imagen ${index + 1}`}
                                                    className='w-[100%] mx-auto h-auto rounded-3xl' // Cambia el tamaño aquí si es necesario
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            ) : (
                                <p>No hay imágenes disponibles.</p>
                            )}
                        </div>
                        <div className='col-span-1 text-left text-2xl '>
                            <h1 className='text-left text-3xl capitalize'>{nombreProducto}</h1>
                            <h2 className='mt-4 font-extralight'>{marca}</h2>
                            <h3 className='font-extralight'>{tipo} {tamano}</h3>

                            <textarea className='w-full p-3 resize-none rounded-xl  shadow-lg mt-8' rows={4} readOnly disabled >{descripcion}</textarea>

                            <div className='mt-3'>
                                <p>{nombre_legal}</p>
                            </div>

                            <div className={`${bgColor} py-3 flex flex-col items-center justify-center mt-4`}>
                                <p>{estadoTexto}</p>
                            </div>


                            <div className='flex items-center justify-center mt-8 gap-20'>
                                <div>
                                    <p className='text-5xl font-extralight'>{formatPriceCLP(precio_ofertado)}</p>
                                    <p className='capitalize text-sm text-gray-400'>oferta mas alta</p>
                                </div>

                                <div className='text-gray-400'>
                                    <p className='text-5xl font-extralight'>{formatPriceCLP(precio_inicial)}</p>
                                    <p className='capitalize text-sm text-gray-400'>precio inicial</p>
                                </div>
                            </div>

                            <div className='flex flex-col items-center md:mx-auto justify-center mt-4 md:w-[50%]'>
                                <Label className='capitalize text-3xl font-extralight mb-3'>publica tu oferta</Label>
                                <Input type='number' className='text-center text-3xl' placeholder={formatPriceCLP(precio_ofertado + 1000)} />
                                <Button className='w-full mt-3 py-7 md:py-3'>Ofertar</Button>
                            </div>

                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className={`${bgColor} md:w-[80%] md:mx-auto p-3 rounded-t-xl`}>
                <h2 className='text-4xl capitalize font-extralight text-center'>
                    tablon de pujas
                </h2>
            </div>

            <div className='md:w-[75%] md:mx-auto'>
                {pujas.length > 0 ? (

                    <Table className={`${bgColor}`}>
                        <TableHeader>
                            <TableRow >
                                <TableHead className={`${bgColor}`}>Usuario</TableHead>
                                <TableHead className={`${bgColor}`}>Monto Ofertado</TableHead>
                                <TableHead className={`${bgColor}`}>Fecha de Puja</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pujas.map((puja) => (
                                <TableRow key={puja.puja_id}>
                                    <TableCell>{puja.usuario.nombre}</TableCell>
                                    <TableCell>{formatPriceCLP(puja.monto)}</TableCell>
                                    <TableCell>{puja.fecha}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                ) : (
                    <div className='text-3xl font-extralight text-center p-6'>
                        <p>Aun no hay pujas en esta subasta</p>
                        <p className='font-semibold'>Se el primero en pujar!</p>
                    </div>
                )

                }
            </div>

        </div>
    )

};

export default AuctionDetailsPage;
