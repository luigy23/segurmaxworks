"use client"

import React, { useEffect, useState } from 'react'
import { obtenerProductos } from '../utils/Api/Productos'
import Producto from './Producto'
import { Input } from '@nextui-org/react'

const Productos = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    obtenerProductos().then((res) => {
      setProductos(res)
    }
    )
  }
  , [])





  return (
    <>
    <div>Productos</div>
    <Input placeholder='Buscar producto' />

    <div className='flex flex-col gap-2 items-center'>
      <div className="p-2 bg-smoke-700 rounded-lg text-smoke-100  md:w-8/12 flex justify-between gap-2 items-center shadow-lg dark:bg-gray-100">
       
          <span>ID</span>
          <span>Nombre del producto</span>
          <span>Precio</span>
          <span>Stock</span>
       
      </div>
      {productos.map((producto) => {
        return (
        <Producto key={producto.id} producto={producto} />
        )
      }
      )}
    </div>
  
    
    </>

  )
}

export default Productos