import { useEffect, useState } from "react"

export function getAuctionsByMarca(marca: number) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos/marcas/${marca}/`
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setResult(json)
                setLoading(false)
            } catch (error: any) {
                setError(error)
                setLoading(false)
            }
        })()
    }, [url])

    return { result, loading, error }
}