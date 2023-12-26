"use client"
import { obtenerMovimientos } from '@/app/utils/Api/Movimientos';
import React, {useState, useEffect} from 'react'
import Movimiento from './Movimiento';
import { formatearFecha } from '@/app/utils/Formateadores';

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
      <h2 className="text-xl ">Movimientos:</h2>
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