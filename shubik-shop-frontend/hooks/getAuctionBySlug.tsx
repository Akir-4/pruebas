import { useEffect, useState } from "react"

export function useGetAuctionBySlug(slug: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/productos/producto/${slug}`;
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`)
                }
                const json = await res.json()
                setResult(json)
            } catch (error: any) {
                setError(error.message || 'Unknown error')
            } finally {
                setLoading(false)
            }
        })()
    }, [slug])

    return { result, loading, error }
}
