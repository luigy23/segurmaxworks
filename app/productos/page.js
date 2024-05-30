import React from 'react'
import Productos from './Productos';

const ProductosPage = () => {
  return (
    <main className="fullh pt-10 gap-7">
        <h1>Productos</h1>
        <div className="flex flex-col w-4/5 md:w-3/5  gap-3">
        <Productos/>
        </div>
        
    </main>
  )
}

export default ProductosPage;