"use client"
import { obtenerMovimientos } from '@/app/utils/Api/Movimientos';
import React, {useState, useEffect} from 'react'
import Movimiento from './Movimiento';
import { formatearFecha } from '@/app/utils/Formateadores';
import { Button } from '@nextui-org/react';

const Movimientos = () => {

    const [movimientos, setMovimientos] = useState([])

    const cargarMovimientos = async () => {
        try {
          const movimientos = await obtenerMovimientos()
          console.log(movimientos)
          setMovimientos(movimientos)
          
        } catch (error) {
          console.log(error)
        }
    
      }
    
    
    
      useEffect(() => {
        cargarMovimientos()
    
      }, [])



  return (
    <>
    
    <div>
      <div className='flex w-full justify-between items-center pb-2'>
      <h2 className="text-xl ">Movimientos:</h2>
      
      <Button
                className="ml-2 text-xl"
                radius="full"
                color="success"
                variant="faded"
                size="sm"
                onClick={cargarMovimientos} 
                isIconOnly>
                 
                   <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.188-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20Z"
                  />
                </svg>
                </Button>
                </div>
     <div className="flex flex-col gap-2 p-3 bg-smoke-900 rounded-lg">
     {
       movimientos.length > 0 ? (
        movimientos.map((movimiento, index) => (
          <Movimiento key={index} movimiento={movimiento}  />
        ))
        ) : (
          <p>No hay movimientos</p>
        )
     }
      </div>
      </div>
    
    
    
    </>
  )
}

export default Movimientos