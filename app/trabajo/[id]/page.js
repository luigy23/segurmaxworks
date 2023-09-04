"use client"
import NavBar from '@/app/Componentes/NavBar';
import { actualizarTrabajo, obtenerTrabajo } from '@/app/utils/supabase';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Input, Radio, RadioGroup, Textarea } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import segurmaxLogo from '@/public/logoSegurmax.svg'
import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';

const TraerTrabajo = (id) => {
    return obtenerTrabajo(id).then((res) => {
        console.log(res)
        return res[0]
    })

}


const Trabajo = ({ params }) => {

    const [trabajo, setTrabajo] = useState({})
    const [comentario, setComentario] = useState('')
    const [calificacion, setCalificacion] = useState('5')

    const { id } = params;
    useEffect(() => {
        TraerTrabajo(id).then((res) => {
            setTrabajo(res)
        })
    }
        , [])

    const handleComentario = (event) => {
        setComentario(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //Actualizamos el trabajo
        const datos = {
            Estado: 1,
            Comentario: comentario,
            Calificacion: calificacion
        }
        actualizarTrabajo(id, datos).then((res) => {
            toast.success('Trabajo actualizado')
            console.log(res)
        }
        ).catch((err) => {
            toast.error('Error al enviar')
            console.log(err)
        })

        //activamos el useEffect para que se actualice la pagina
        TraerTrabajo(id).then((res) => {
            setTrabajo(res)
        })
    }





    return (
        <>

            <main className="flex flex-col items-center justify-center bg-smoke-800 text-slate-50 h-screen dark gap-4">
                {/* logo: */}
                <Image src={segurmaxLogo} alt="Segurmax Logo" width={250} height={250} />
                <h1 className='text-xl mb-5'>Detalles de su Servicio</h1>
                <Card className='w-[80%]'>
                    <CardHeader className="justify-between">
                        <div className='flex gap-1 justify-between items-center'>
                            <p><span className='text-shamrock-400 '>Trabajador: </span> {trabajo.Trabajador}</p>
                        </div>
                        {/* Fecha Formateada dd/mm/aaaa */}
                        <Chip color='success' size='small' className='text-sm'>
                            {new Date(trabajo.Fecha).toLocaleDateString()}
                        </Chip>

                    </CardHeader>
                    <Divider />
                    <CardBody><span className='text-shamrock-400'>Descripcion: </span> {trabajo.Descripcion}</CardBody>
                    <Divider />
                    <CardFooter className='gap-2' >
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm'>Precio:</p>
                            <Chip color='success' variant='flat'

                            >
                                $ {trabajo.Precio}

                            </Chip>
                        </div>
                        <Divider orientation='vertical' />
                        {
                            //si el estado es 1 entonces se muestra el comentario y la calificacion
                            trabajo.Estado === 1 ?
                                (
                                   
                                     <>
                                        <div className='flex flex-col gap-1'>
                                        <p className='text-sm'>Calificacion:</p>
                                        <Chip color='success' variant='flat'

                                        >
                                            {trabajo.Calificacion}

                                        </Chip>
                                    </div>

                                    <Divider orientation='vertical' />
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-sm'>Comentario: {
                                            trabajo.Comentario ? trabajo.Comentario : 'Sin Comentario'
                                        }</p>
                                    </div>
                                 
                                    </>   
                                    
                                    


                                ) 
                                : null

                        }
                    </CardFooter>
                </Card>
                {
                    trabajo.Estado === 0 ?
                        (
                        <div className='w-[80%] mt-3'>
                            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>

                                <RadioGroup
                                    color='success'
                                    label="Califique el servicio"
                                    value={calificacion}
                                    orientation="horizontal"
                                    onChange={(e) => setCalificacion(e.target.value)}
                                    defaultChecked="1"
                                >
                                    <Radio value="1">1</Radio>
                                    <Radio value="2">2</Radio>
                                    <Radio value="3">3</Radio>
                                    <Radio value="4">4</Radio>
                                    <Radio value="5">5</Radio>

                                </RadioGroup>
                                <h2 className='text-xl mb-2'>Si tienes alguna observación escribela en el comentario:</h2>
                                <Textarea value={comentario} onChange={handleComentario}
                                    variant='bordered' color='default' label='Comentario' minRows={1} name='Comentario' />
                                <Button variant='shadow' type='submit' color='success' className='font-semibold'>Enviar</Button>
                            </form>
                        </div>
                        )

                        : null

                }

            </main>
            <Toaster />
        </>
    )
}

export default Trabajo