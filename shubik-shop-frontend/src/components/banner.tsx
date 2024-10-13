import { useRouter } from 'next/navigation'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import '@/app/globals.css'
import banner01 from '../public/banner01.webp'
import banner02 from '../public/banner02.webp'
import banner03 from '../public/banner03.webp'
import { Button } from './ui/button'

export const dataCarouselMainPage = [
    {
        id: 1,
        url: '',
        titulo: 'TU prenda, TU oferta, TU estilo',
        subtitulo: "En Shubik Shop, cada prenda cuenta su propia historia.",
        parrafo: 'Descubre una experiencia única donde tú decides el estilo, el precio y el momento perfecto. ¡Ofertas exclusivas, ropa única y el poder de personalizar tu guardarropa, todo en un solo lugar! Tu prenda, tu oferta, tu estilo.',
        bannerImg: banner01,
        button: ''
    },

    {
        id: 2,
        url: '/pagina-registro',
        titulo: '¡No te quedes fuera!',
        subtitulo: "Regístrate hoy en Shubik Shop y empieza a pujar por las mejores prendas exclusivas.",
        parrafo: 'Con cada oferta, te acercas más a conseguir tu estilo ideal al mejor precio. ¡Haz de tu guardarropa una subasta ganadora!',
        bannerImg: banner02,
        button: 'Registrate en Shubik Shop'
    },

    {
        id: 3,
        url: '/pagina-vendedor',
        titulo: 'Impulsa tu negocio de ropa americana con Shubik Shop.',
        subtitulo: "Únete a nuestra plataforma y llega a más compradores interesados en tu estilo único.",
        parrafo: 'Regístrate como vendedor y empieza a subastar tus prendas hoy mismo. ¡Amplía tu alcance, aumenta tus ventas y haz crecer tu marca con nosotros!',
        bannerImg: banner03,
        button: 'Conocer Más'
    }

]

const BannerMainPage = () => {

    const router = useRouter()
    return (
        <div className=''>
            <Carousel plugins={[
                Autoplay({
                    delay: 15000,

                }),
                Fade({
                    active: true
                }),

            ]} className=''>
                <CarouselContent className='w-full'>
                    {
                        dataCarouselMainPage.map((data) => (

                            <CarouselItem key={data.id} className=''>
                                <div className='absolute w-full h-full flex flex-col-reverse' >
                                    <div className='bgText w-[80%] text-white p-4 text-left flex flex-row justify-between items-end rounded-tr-full'>
                                        <div>
                                            <h2 className='text-2xl '>{data.titulo}</h2>
                                            <h3 className='text-xl mb-4'>{data.subtitulo}</h3>
                                            <p>{data.parrafo}</p>
                                        </div>
                                        <Button
                                            className={`bg-white text-black hover:bg-gray-600 hover:text-white ${!data.button && 'hidden'}`}
                                            onClick={() => router.push(data.url)} // Navegar al URL del botón si existe
                                        >
                                            {data.button}
                                        </Button>
                                    </div>

                                </div>
                                <img src={data.bannerImg.src} alt="" />

                            </CarouselItem>

                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default BannerMainPage