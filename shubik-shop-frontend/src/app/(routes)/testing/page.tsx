'use client'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import ListTask from "./ListTask"

const page = () => {
    const [title, setTitle] = useState('')
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(title)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
            method: 'POST',
            body: JSON.stringify({ title }),
            headers: {
                'Content-Type': "application/json",
            }
        })
        const data = await res.json()
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titulo"></label>
                    <input className="border-black border-solid" type="text" name="titulo" onChange={e => setTitle(e.target.value)} />
                    <Button>enviar</Button>
                </div>

            </form>
            <div>
                <ListTask />
            </div>
        </div>
    )
}

export default page
