"use client"
import React, { useState } from 'react'
import NavBar from '../Componentes/NavBar'
import { Button, Input, Textarea } from '@nextui-org/react'
import { insertarTrabajo } from '../utils/supabase'
import toast, { Toaster } from 'react-hot-toast';
import { formatearPrecio } from '../utils/Formateadores'

const New = () => {


    const [formulario, setFormulario] = useState({})
    const [json, setJson] = useState({})

    const handleInputChange = (event) => {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        })

        //si el nombre del input es precio, formateamos el precio
        if (event.target.name === 'Precio') {
            setJson({
                ...formulario,
                [event.target.name]: formatearPrecio(event.target.value)
            })
            return
        }
        //si no, dejamos el valor como viene
        setJson({
            ...formulario,
            [event.target.name]: event.target.value
        })


    }


const handleSubmit = (event) => {
    event.preventDefault()
    //Verificamos que los campos no esten vacios
    //si alguno está vacio, se envia una alerta, y no se envia
    if (!formulario.Descripcion || !formulario.Trabajador  || !formulario.Precio) {
        alert('Todos los campos son obligatorios')
        return
    }
    //Si todos los campos estan llenos, se envia el formulario
    //antes agregamos al objeto formulario atributo Estado = 0;
    const formularioConEstado = {
        ...formulario,
        Estado: 0
    }
 
  
    insertarTrabajo(formularioConEstado).then((res) => {
        console.log(res)
        toast.success('Trabajo agregado')
    }).catch((err) => {
        console.log(err)
        toast.error('Error al agregar el trabajo')
    })
}

  return (




    <>
        <NavBar/>

    <main className="flex flex-col items-center justify-center bg-smoke-800 text-slate-50 h-[calc(100vh-4rem)] h- dark">
      <h1 className='text-3xl font-semibold mb-2'>Nuevo</h1>
      <form className='flex flex-col w-[80%] gap-2' onSubmit={handleSubmit}>
        <Textarea value={formulario.Descripcion} onChange={handleInputChange}
        variant='bordered' color='default' label='Descripcion' minRows={1} name='Descripcion' />
        <Input variant='bordered' color='default' label='Trabajador' name='Trabajador'
        value={formulario.Trabajador} onChange={handleInputChange} />



         <Input
          type="number"
          label="Precio"
          placeholder="0.00"
          variant='bordered'
          name='Precio'
          value={formulario.Precio}
          onChange={handleInputChange}
          color='success'

          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
            }
            />



        <Button variant='shadow' type='submit' color='danger'>Guardar</Button>
     </form>

     {/* aqui mostramos el objeto */
     

     }
        <pre className='w-[80%] whitespace-pre-wrap flex flex-col flex-wrap overflow-hidden'>
            {
                JSON.stringify(json, null, 2)
                //remplazamos precio por el precio formateado
                
            }
            
        </pre>





      </main>
      <Toaster />
    
    </>
  )
}

export default New