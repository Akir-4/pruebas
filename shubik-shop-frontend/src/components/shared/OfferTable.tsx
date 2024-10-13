import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetProductoConPujas } from "../../../hooks/getPujasByProductoId"
import React from 'react'




const OfferTable: React.FC<{ productoId: number }> = ({ productoId }) => {
    const { pujas, loading, error } = useGetProductoConPujas(productoId);

    console.log(pujas)
    return (

        <div className='flex flex-col items-center border border-solid bg-white shadow-md '>
            {pujas.length === 0 && (
                <p className="p-3 text-3xl font-light text-center">Esta subasta aún no tiene pujas creadas...</p>
            )}

            {pujas.length && (
                <Table className="rounded-lg">
                    <TableCaption>Lista de ofertas</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center font-bold text-black bg-sky-300">Usuario</TableHead>

                            <TableHead className="text-center font-bold text-black bg-sky-300">Oferta</TableHead>
                            <TableHead className="text-center font-bold text-black bg-sky-300">Ultima actualización</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pujas.map((puja) => (

                            <TableRow key={puja.puja_id}>

                                <TableCell className="text-center">{puja.usuario_nombre}</TableCell>
                                <TableCell className="text-center">{puja.monto}</TableCell>
                                <TableCell className="text-center">{puja.fecha}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

        </div>
    )
}

export default OfferTable
