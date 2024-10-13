interface Tags {
    size: string;
    brand: string;
    type: string
    className?: string
}
const Tag = (props: Tags) => {
    const { size, brand, className, type } = props;
    return (
        <div className={className}>
            <div className="flex flex-col justify-center items-center">
                <p
                    className='px-2 py-1 text-white bg-black rounded-full dark:text-black dark:bg-white w-fit'
                >
                    {size}
                </p>
                <h3 className="uppercase mt-2 text-slate-400">talla</h3>
            </div>


            <div className="flex flex-col justify-center items-center">
                <p
                    className='px-2 py-1 text-white bg-black rounded-full dark:text-black dark:bg-white w-fit'
                >
                    {brand}
                </p>
                <h3 className="uppercase mt-2 text-slate-400">marca</h3>
            </div>

            <div className="flex flex-col justify-center items-center">
                <p
                    className='px-2 py-1 text-white bg-black rounded-full dark:text-black dark:bg-white w-fit'
                >
                    {type}
                </p>
                <h3 className="uppercase mt-2 text-slate-400">prenda</h3>
            </div>
        </div>
    )
}

export default Tag
