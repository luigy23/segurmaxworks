"use client"
import NavBar from '@/app/Componentes/NavBar';
import { obtenerTrabajo } from '@/app/utils/supabase';
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import segurmaxLogo from '@/public/logoSegurmax.svg'
import Image from 'next/image';

const TraerTrabajo = (id) => {
    return obtenerTrabajo(id).then((res) => {
        console.log(res)
        return res[0]
    })

}


const Trabajo =  ({ params }) => {

    const [trabajo, setTrabajo] = useState({})
    
    const { id } = params;
    useEffect(() => {
        TraerTrabajo(id).then((res) => {
            setTrabajo(res)
        })
    }
        , [])




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
                    <CardFooter >
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm'>Precio:</p>
                        <Chip color='success' variant='flat'
                        
                        >
                         $ {trabajo.Precio}
                        
                        </Chip>
                        </div>
                    </CardFooter>
                </Card>


            </main>
        </>
    )
}

export default Trabajo