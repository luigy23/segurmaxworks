"use client"
import { XIcon } from '@/app/Assets/Icons/XIcon'
import { Button } from '@nextui-org/react'
import React from 'react'
import { useRouter } from 'next/navigation'
import TecladoVirtual from './Componentes/TecladoVirtual'

const PageNuevoMovimiento = () => {

    const router = useRouter()
    
    const handleBack = () => {
        router.back()
    }

  return (
    <main className='flex flex-col items-center gap-4 bg-smoke-800 h-screen text-slate-50 dark'>
        <div className='w-full bg-slate-50 text-smoke-400 p-2 rounded-md items-center flex justify-start gap-3'>
            <Button
            onClick={handleBack}
            variant='ghost' className='text-smoke-800 hover:text-slate-50 p-0' isIconOnly>
                <XIcon className="text-2xl" />
            </Button>
        </div>
        <TecladoVirtual />


    </main>
)
}

export default PageNuevoMovimiento