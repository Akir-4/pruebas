interface Tags {
    size: string;
    brand: string;
    type: string
    className?: string
}
const TagNoLabel = (props: Tags) => {
    const { size, brand, className, type } = props;
    return (
        <div className={className}>

            <p
                className='px-2 py-1 text-white bg-black rounded-full dark:text-black dark:bg-white w-fit'
            >
                {size}
            </p>

            <p
                className='px-2 py-1 text-white bg-black rounded-full dark:text-black dark:bg-white w-fit'
            >
                {brand}
            </p>

            <p
                className='px-2 py-1 text-white bg-black rounded-full dark:text-black dark:bg-white w-fit'
            >
                {type}
            </p>

        </div>
    )
}

export default TagNoLabel
