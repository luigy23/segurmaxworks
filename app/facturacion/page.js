
import React from 'react'
import BtnSaldo from './Componentes/BtnSaldo';
//import { Button } from '@nextui-org/react';
import BtnFacturar from './Ingreso/BtnFacturar';
import Movimientos from './Componentes/Movimientos';
import BtnGastar from './Egreso/BtnGastar';



const FacturaciónPage = () => {






  return (
    <main className="fullh pt-10 gap-7">
      <div className="flex  gap-2 p-3 items-center justify-center" >
      {/* <Button color="danger" auto>Restar</Button> */}
      <BtnGastar />
      <BtnSaldo />
      <BtnFacturar />
     </div>
    <Movimientos/>
    

     
    
    </main>
  )
}

export default FacturaciónPage