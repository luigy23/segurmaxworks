"use client"

import { Button } from '@nextui-org/react'
import { insertarTrabajo, obtenerTrabajos } from './utils/supabase'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { formatearFecha, formatearHora } from './utils/Formateadores';
import NavBar from './Componentes/NavBar';
import Link from 'next/link';






export default  function Home() {

  const [trabajos, setTrabajos] = useState([])


  useEffect(() => {
    obtenerTrabajos('Trabajos').then((res) => {
      console.log(res)
      setTrabajos(res)
    }
    )
  }
    , [])





  return (
    <>

      <main className="flex flex-col items-center justify-center bg-smoke-800 text-slate-50 h-screen dark">
        



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
              <TableColumn>Hora</TableColumn>
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
                      <TableCell>{formatearFecha(item.Fecha)}</TableCell>
                      <TableCell>{formatearHora(item.Hora)}</TableCell>
                      <TableCell>{item.Precio}</TableCell>
                      <TableCell>{chips[item.Estado]}</TableCell>
                      <TableCell><Link href={"trabajo/"+item.id}> Ver</Link></TableCell>
                  
                    </TableRow>
                   
                  )
                }
              }
            </TableBody>
          </Table>
        </div>
       

      </main>
    </>
  )
}

export const chips = {
 0: <Chip color='warning'>Pendiente</Chip>,
 1: <Chip color='success'>Finalizado</Chip>,
 2: <Chip color='error'>Cancelado</Chip>
}