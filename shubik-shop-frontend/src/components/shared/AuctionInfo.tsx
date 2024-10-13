import React from 'react'
import Tag from './TagsClothes'
import UserLogo from '../UserLogo'
import { AuctionType } from '../../../types/auction'

export type InfoProductProps = {
    auction: AuctionType
}
const AuctionInfo = (props: InfoProductProps) => {
    const { auction } = props
    return (
        <div className='flex flex-col justify-center'>
            <h2 className='text-xl font-semibold'>Informacion del Producto</h2>
            <p className='mb-2'>Categoria: Poleras</p>
            <Tag size={auction.tamano} brand='Nike' />
            <p className='mt-2'>Creado: Hace 10 horas</p>
            <p className='mt-2'>Finaliza: 05/12/25</p>

            <UserLogo />

        </div>
    )
}

export default AuctionInfo
