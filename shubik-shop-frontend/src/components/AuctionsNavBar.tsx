import React from 'react'
import { Button } from './ui/button'

const AuctionsNavBar = () => {

  const buttonLabel = ['Mas Recientes', 'Populares', 'Mis Ofertas']
  return (
    <div className='flex flex-row items-center mt-0 justify-center'>
      {buttonLabel.map((label, index) => (
        <Button key={index} className='w-[30%] rounded-none hover:transition-transform hover:bg-black hover:scale-110 text-sm'>{label}</Button>
      ))}
    </div>
  )
}

export default AuctionsNavBar
