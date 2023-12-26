
"use client"
import React, { useEffect, useState } from 'react'
import { obtenerSaldo } from '../utils/Api/Caja';
import BtnSaldo from './Componentes/BtnSaldo';
import { obtenerMovimientos } from '../utils/Api/Movimientos';
import { formatearFecha } from '../utils/Formateadores';
import Movimiento from './Componentes/Movimiento';
import { Button } from '@nextui-org/react';



const FacturaciónPage = () => {
  const [saldo, setSaldo] = useState(0)
  const [movimientos, setMovimientos] = useState([])

  const cargarSaldo = async () => {
    try {
      const saldo = await obtenerSaldo()
      console.log(saldo)
      setSaldo(saldo[0].Saldo)
    } catch (error) {
      console.log(error)
    }

  }

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
    cargarSaldo()
    cargarMovimientos()

  }, [])



  return (
    <main className="fullh pt-10 gap-7">
      <div className="flex  gap-2 p-3 items-center justify-center" >
      <Button color="danger" auto>Restar</Button>
     <BtnSaldo saldo={saldo} cargarSaldo={cargarSaldo} />
     <Button color="primary" auto>Facturar</Button>
     </div>

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
     
    
    </main>
  )
}

export default FacturaciónPage