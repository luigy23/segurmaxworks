"use client"

import { Button } from '@nextui-org/react'
import { insertarTrabajo, obtenerTrabajos } from './utils/supabase'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import NavBar from './Componentes/NavBar';
import Link from 'next/link';




const TraerTrabajos =  () => {
  return obtenerTrabajos('Trabajos').then((res) => {
      console.log(res)
      return res
  }
  
    )


}

export default  function Home() {

  const [trabajos, setTrabajos] = useState([])


  useEffect(() => {
    TraerTrabajos().then((res) => {
      setTrabajos(res)
    })
  }
    , [])




  // const handleclick = () => {
  //   console.log('click')
  //   obtenerTrabajos('Trabajos').then((res) => {
  //     console.log(res)
  //     setData(res)
  //   }
  //   )
  // }

  // const handleInsert = () => {
  //   console.log('insert')
  //   insertarTrabajo('Trabajos', datos).then((res) => {
  //     console.log(res)

  //   }

  //   )
  // }

  return (
    <>
      <NavBar />

      <main className="flex flex-col items-center justify-center bg-smoke-800 text-slate-50 h-screen dark">
        <h1 className='text-3xl font-semibold'>Hola</h1>



        <div className="w-5/6">
          <Table aria-label="Example static collection table"
            selectionMode='single'
            color='success'



          >
            <TableHeader>
              <TableColumn>Id</TableColumn>
              <TableColumn>Descripcion</TableColumn>
              <TableColumn>Trabajador</TableColumn>
              <TableColumn>Fecha</TableColumn>
              <TableColumn>Precio</TableColumn>
              <TableColumn>Estado</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody //items={trabajos} pero para que no de error cuando no hay datos sería así: items={trabajos || []}
              items={trabajos || []}
              emptyContent={"No hay datos"}
              isLoading={trabajos.length === 0}
              loadingContent={<TableRow >
                Holaaaa</TableRow>}
            >

              {
                (item, index) => {
                  return (
                    
                    <TableRow  as={<Link href="/trabajo"/>} >
                     
                      <TableCell >{item.id}</TableCell>
                      <TableCell>{item.Descripcion}</TableCell>
                      <TableCell>{item.Trabajador}</TableCell>
                      <TableCell>{new Date(item.Fecha).toLocaleTimeString }</TableCell>
                      <TableCell>{item.Precio}</TableCell>
                      <TableCell>{item.Estado}</TableCell>
                      <TableCell><Link href={"trabajo/"+item.id}> Ver</Link></TableCell>
                  
                    </TableRow>
                   
                  )
                }
              }
            </TableBody>
          </Table>
        </div>
        {/* mostramos el seleccionado: */}

      </main>
    </>
  )
}
