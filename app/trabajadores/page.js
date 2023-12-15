import React from 'react'
import SelectTrabajadores from '../Componentes/SelectTrabajadores'
import CrearTrabajador from './CrearTrabajador'
import TablaTrabajadores from './TablaTrabajadores'


const TrabajadoresPage = () => {




  return (
    <main className="fullh pt-10 gap-7">
        <h1>Trabajadores</h1>

       
        <CrearTrabajador/>
        <TablaTrabajadores/>
       
    </main>

  )
}

export default TrabajadoresPage