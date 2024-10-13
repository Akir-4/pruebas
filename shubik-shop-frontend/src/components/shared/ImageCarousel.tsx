import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


interface CarouselSubastaProps {
    url: string
}
const ImageCarousel = (props: CarouselSubastaProps) => {
    const { url } = props
    console.log(url)
    return (
        <div className="flex flex-col items-center">
            <Carousel>
                <CarouselContent>
                    <img src={url} alt="" />
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default ImageCarousel
