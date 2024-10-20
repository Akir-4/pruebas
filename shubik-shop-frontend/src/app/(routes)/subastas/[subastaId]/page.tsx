"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetAuctionBySubastaId } from '../../../../../hooks/getAuctionBySubastaId';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Fade from 'embla-carousel-fade';
import { Label } from '@/components/ui/label';
import { formatPriceCLP } from '@/lib/formatPriceCLP';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { jwtDecode } from 'jwt-decode'; // Para decodificar el token JWT

type Puja = {
    puja_id: number;
    usuario: { nombre: string };
    monto: number;
    fecha: string;
};

type JwtPayload = {
    user_id: number;  // Cambia esto si tu JWT tiene un nombre de campo diferente para el ID de usuario
};

// Función para calcular el tiempo restante
const calculateTimeLeft = (fecha_termino: string) => {
    const endDate = new Date(fecha_termino).getTime(); // Convertir la fecha de término a un timestamp
    const now = new Date().getTime(); // Obtener la fecha actual en timestamp

    const difference = endDate - now;

    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
            horas: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutos: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            segundos: Math.floor((difference % (1000 * 60)) / 1000),
        };
    }

    return timeLeft;
};

const AuctionDetailsPage = () => {
    const [timeLeft, setTimeLeft] = useState<any>({});
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para saber si el usuario está autenticado
    const [highestBid, setHighestBid] = useState<number | null>(null); // Estado para manejar la oferta más alta
    const [isAuctionFinished, setIsAuctionFinished] = useState<boolean>(false); // Estado para manejar si la subasta ha terminado
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para manejar mensajes de error
    const [offer, setOffer] = useState<number>(0); // Estado para manejar la oferta del usuario
    const [pujas, setPujas] = useState<Puja[]>([]); // Estado para manejar las pujas
    const [userId, setUserId] = useState<number | null>(null); // Estado para almacenar el user_id decodificado del token
    const params = useParams();  // Obtener los parámetros dinámicos de la URL
    const subastaIdStr = Array.isArray(params.subastaId) ? params.subastaId[0] : params.subastaId;
    const subastaId = parseInt(subastaIdStr);  // Convertir a número
    const { result: subasta, loading, error } = useGetAuctionBySubastaId(subastaId);

    const token = localStorage.getItem('access_token');

    // Verificar si el token es válido y obtener el user_id
    useEffect(() => {
        if (token) {
            try {
                const decoded: JwtPayload = jwtDecode<JwtPayload>(token); // Decodificamos el token
                setUserId(decoded.user_id);  // Guardamos el user_id en el estado
                setIsAuthenticated(true);    // Usuario autenticado
                console.log('ID del usuario decodificado:', decoded.user_id);  // Mostramos el ID en consola para verificar
            } catch (err) {
                console.error("Error al decodificar el token:", err);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);  // Si no hay token, el usuario no está autenticado
        }
    }, [token]);

    // Función para obtener las pujas de la subasta
    const fetchPujas = async (subastaId: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/compras/pujas/?subasta_id=${subastaId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Enviamos el token si es necesario
                },
            });
            const data = await response.json();
            setPujas(data); // Aquí actualizas el estado con las nuevas pujas
            if (data.length > 0) {
                const highest = Math.max(...data.map((puja: Puja) => puja.monto));
                setHighestBid(highest); // Guardar la oferta más alta
            }
        } catch (error) {
            console.error("Error fetching pujas:", error);
        }
    };
    /* Usar useEffect para traer los datos de la puja mas alta cada 15 segundos */
    useEffect(() => {
        fetchPujas(subastaId);
        const intervalId = setInterval(() => {
            fetchPujas(subastaId);
        }, 15000);

        return () => clearInterval(intervalId);
    }, [subastaId]);




    // Función para manejar la oferta
    const handleOffer = async () => {
        if (!userId) {
            console.error("No se pudo obtener el ID del usuario del token");
            return;
        }
        if (offer <= (highestBid || 0)) {
            setErrorMessage("La oferta debe ser mayor que la oferta más alta."); // Mostrar mensaje de error
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/compras/pujas/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Token de autenticación
                },
                body: JSON.stringify({
                    subasta_id: subastaId,  // El id de la subasta en la que el usuario está pujando
                    usuario_id: userId,     // Este será el ID del usuario obtenido del token JWT
                    monto: offer,           // El monto de la oferta
                    fecha: new Date().toISOString().split('T')[0],  // Fecha actual en formato YYYY-MM-DD
                }),
            });

            if (response.ok) {
                const nuevaPuja = await response.json();
                setPujas([...pujas, nuevaPuja]);  // Agregamos la nueva puja a la lista de pujas existentes
                setOffer(0);  // Reseteamos el input de la oferta después de pujar
            } else {
                const errorData = await response.json();
                console.error("Error al realizar la oferta:", errorData);
            }
        } catch (error) {
            console.error("Error al realizar la oferta:", error);
        }
    };

    // Llamamos a `fetchPujas` cuando la página cargue o cuando se realice una nueva oferta
    useEffect(() => {
        fetchPujas(subastaId);
    }, [subastaId]);

    useEffect(() => {
        // Verificamos si existe una fecha de término antes de establecer el intervalo
        if (subasta?.fecha_termino) {
            const intervalId = setInterval(() => {
                setTimeLeft(calculateTimeLeft(subasta.fecha_termino));
                const timeRemaining = calculateTimeLeft(subasta.fecha_termino);
                setTimeLeft(timeRemaining);

                const hasFinished = Object.keys(timeRemaining).length === 0;
                setIsAuctionFinished(hasFinished); // Si no hay tiempo restante, la subasta ha terminado
            }, 1000);

            // Limpiar el intervalo cuando el componente se desmonte
            return () => clearInterval(intervalId);
        }
    }, [subasta?.fecha_termino]);  // Solo se ejecuta si `subasta.fecha_termino` cambia o está definida


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
            precio_inicial,
            precio_ofertado,
            tienda: {
                nombre_legal
            }
        },
    } = subasta || {};



    const bgColor = estadoProducto === 1 ? 'bg-[#228B22] text-white' :
        estadoProducto === 2 ? 'bg-[#3CB371]' :
            estadoProducto === 3 ? 'bg-[#4682B4] text-white' :
                estadoProducto === 4 ? 'bg-[#5F9EA0] text-white' :
                    estadoProducto === 5 ? 'bg-[#9370DB]' :
                        estadoProducto === 6 ? 'bg-[#B0C4DE]' :
                            estadoProducto === 7 ? 'bg-[#708090]' :
                                estadoProducto;

    const focusColor = estadoProducto === 1 ? 'hover:bg-[#228B22] hover:text-white' :
        estadoProducto === 2 ? 'hover:bg-[#3CB371]' :
            estadoProducto === 3 ? 'hover:bg-[#4682B4] hover:text-white' :
                estadoProducto === 4 ? 'hover:bg-[#5F9EA0]' :
                    estadoProducto === 5 ? 'hover:bg-[#9370DB]' :
                        estadoProducto === 6 ? 'hover:bg-[#B0C4DE]' :
                            estadoProducto === 7 ? 'hover:bg-[#708090]' :
                                estadoProducto;

    const estadoTexto = estadoProducto === 1 ? 'Nuevo con Etiqueta' :
        estadoProducto === 2 ? 'Nuevo sin Etiqueta' :
            estadoProducto === 3 ? 'Como Nuevo' :
                estadoProducto === 4 ? 'Muy Buen Estado' :
                    estadoProducto === 5 ? 'Buen Estado' :
                        estadoProducto === 6 ? 'Estado Aceptable' :
                            estadoProducto === 7 ? 'Estado Desgastado' :
                                estadoProducto;


    const imagenes = [imagen_1, imagen_2, imagen_3, imagen_4].filter(image => image !== null);


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
                                                    className='w-[100%] mx-auto h-auto rounded-3xl'
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

                            <textarea
                                className='w-full p-3 resize-none rounded-xl shadow-lg mt-8'
                                rows={4}
                                readOnly
                                disabled
                                value={descripcion || 'El vendedor no ha dado una descripción para esta subasta...'} // Si no hay descripción, pasa una cadena vacía para evitar errores
                            />
                            <p className='mb-4' >{nombre_legal}</p>

                            <div className='flex flex-col items-center'>
                                {Object.keys(timeLeft).length > 0 ? (
                                    <div>
                                        <p className='md:text-5xl text-3xl font-extralight'>
                                            {timeLeft.dias}d {timeLeft.horas}h {timeLeft.minutos}m {timeLeft.segundos}s
                                        </p>
                                        <p className='text-sm capitalize text-center font-extralight'>tiempo restante</p>
                                    </div>

                                ) : (
                                    <p className='md:text-3xl text-2xl text-red-600 font-extralight'>La subasta ha terminado</p>
                                )}

                                <div className='flex md:gap-52 gap-16 mt-4 mb-4'>
                                    <div>
                                        <p className='font-extralight'>{fecha_inicio}</p>
                                        <p className='capitalize text-sm font-extralight'>fecha inicio</p>
                                    </div>
                                    <div>
                                        <p className='font-extralight'>{fecha_termino}</p>
                                        <p className='capitalize text-sm font-extralight'>fecha termino</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`${bgColor} text-center p-3 rounded-2xl`}>
                                <p>{estadoTexto}</p>
                            </div>

                            <div className='font-extralight flex flex-row items-center justify-center gap-16 mt-3'>
                                <div className='text-5xl'>
                                    <p>{formatPriceCLP(highestBid || precio_inicial)}</p> {/* Mostrar la oferta más alta o el precio inicial si no hay pujas */}
                                    <p className='text-sm'>oferta mas alta</p>
                                </div>
                                <div className='text-5xl'>
                                    <p>{formatPriceCLP(precio_inicial)}</p>
                                    <p className='text-sm'>Precio inicial</p>
                                </div>
                            </div>

                            <div className='flex flex-col items-center md:mx-auto justify-center mt-4 md:w-[50%]'>
                                <Label className='capitalize text-3xl font-extralight mb-3'>Publica tu oferta</Label>
                                <Input
                                    type='number'
                                    className='text-center text-3xl'
                                    placeholder={formatPriceCLP(precio_ofertado + 1000)}
                                    value={offer}
                                    onChange={(e) => setOffer(Number(e.target.value))}
                                    disabled={!isAuthenticated || isAuctionFinished} // Deshabilitar si la subasta ha terminado
                                />
                                <Button
                                    className='w-full mt-3 py-7 md:py-3'
                                    onClick={handleOffer}
                                    disabled={!isAuthenticated || offer <= (highestBid || 0) || isAuctionFinished} // Deshabilitar si la subasta ha terminado o si la oferta es menor que la más alta
                                >
                                    {isAuthenticated ? (isAuctionFinished ? 'Subasta finalizada' : 'Ofertar') : 'Inicia sesión para ofertar'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className={`${bgColor} p-3 rounded-2xl md:w-[80%] mx-auto text-center text-4xl font-extralight capitalize `}>
                <h2>Tablon de ofertas</h2>
            </div>
            {/* Tablón de pujas */}
            <div className='md:w-[75%] md:mx-auto'>
                {pujas.length > 0 ? (
                    <Table className={`${bgColor} opacity-60`} >
                        <TableHeader>
                            <TableRow>
                                <TableHead className={`${bgColor} font-bold`}>Usuario</TableHead>
                                <TableHead className={`${bgColor} font-bold`}>Monto Ofertado</TableHead>
                                <TableHead className={`${bgColor} font-bold `}>Fecha de Puja</TableHead>
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
                        <p className='font-semibold'>¡Sé el primero en pujar!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuctionDetailsPage;
