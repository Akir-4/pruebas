interface auctionTitle {
    title: string
}

const Title = (props: auctionTitle) => {
    const { title } = props
    return (
        <>
            <h1 className="text-3xl mb-2 capitalize font-black">{title}</h1>
        </>
    )
}

export default Title
