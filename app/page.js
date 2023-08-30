"use client"

import { Button } from '@nextui-org/react'
import { insertarTrabajo, obtenerTrabajos } from './utils/supabase'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import NavBar from './Componentes/NavBar';


export default function Home() {

  const [data, setData] = useState([])

  const datos = {
    Descripcion: 'Pintar paredes',
    Trabajador: 'Juan',
    Fecha: '2021-06-01',
    Precio: 1000
}

useEffect(() => {
  obtenerTrabajos('Trabajos').then((res) => {
    console.log(res)
    setData(res)
  })


}, [])




  const handleclick = () => {
    console.log('click')
    obtenerTrabajos('Trabajos').then((res) => {
      console.log(res)
      setData(res)
    }
    )
  }

  // const handleInsert = () => {
  //   console.log('insert')
  //   insertarTrabajo('Trabajos', datos).then((res) => {
  //     console.log(res)
    
  //   }
    
  //   )
  // }

  return (
    <>
    <NavBar/>

    <main className="flex flex-col items-center justify-center bg-smoke-800 text-slate-50 h-screen dark">
      <h1 className='text-3xl font-semibold'>Hola</h1>
      <Button 
      onClick={handleclick}
      variant='faded' color='success'>Cargar Datos</Button>
      {/* <Button 
      onClick={handleInsert}
      variant='flat' color='error'>Insertar Dato</Button> */}

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
      </TableHeader>
      <TableBody items={data}>
      {
        (item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.Descripcion}</TableCell>
              <TableCell>{item.Trabajador}</TableCell>
              <TableCell>{item.Fecha}</TableCell>
              <TableCell>{item.Precio}</TableCell>
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
