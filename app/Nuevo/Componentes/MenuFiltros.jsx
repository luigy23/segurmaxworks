import React from 'react'
import { Button } from '@nextui-org/react'
import { SearchIcon } from '@/app/Assets/Icons/SearchIcon'
import { CalendarICon } from '@/app/Assets/Icons/CalendarIcon'
import Link from 'next/link'


const MenuFiltros = () => {
    return (
        <div className='w-full bg-slate-50 text-smoke-400 p-2 rounded-md items-center flex justify-center gap-3'>
            <Button className='text-smoke-600 hover:text-slate-50' variant='ghost' >Fecha</Button>
            <Link href='/Nuevo/Filtro/Fecha'>
            <Button className='text-smoke-600 hover:text-slate-50' variant='ghost' isIconOnly>
                <CalendarICon className="text-lg" />
            </Button>
            </Link>
           
            <Button className='text-smoke-600 hover:text-slate-50' variant='ghost' isIconOnly>
                <SearchIcon className="text-lg" />
            </Button>
           
        </div>
    )
}

export default MenuFiltros
