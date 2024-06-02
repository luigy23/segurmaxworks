"use client"
import React, { useEffect, useState } from 'react'
import { obtenerMovimientos } from '../utils/Api/Movimientos'
import MovimientosPorFecha from './Componentes/MovimientosPorFecha'
import MenuFiltros from './Componentes/MenuFiltros'
import BottomMenu from './Componentes/BottomMenu'


const NuevoPage = () => {

    const [movimientos, setMovimientos] = useState([])
    
    const fetchMovimientos = async () => {
        const res = await obtenerMovimientos();
        setMovimientos(res);
    }

    useEffect(() => {
        fetchMovimientos();
    }, [])

    // Agrupar movimientos por fecha
    const groupByDate = (movements) => {
        return movements.reduce((acc, movimiento) => {
            const date = movimiento.Date.split('T')[0]
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(movimiento)
            return acc
        }, {})
    }

    const groupedMovements = groupByDate(movimientos)

    return (
        <main className='flex flex-col items-center gap-4 bg-smoke-800 h-[calc(100vh-4rem)] p-4 text-slate-50 dark'>
            <MenuFiltros />
            <MovimientosPorFecha groupedMovements={groupedMovements} onMovimientoUpdated={fetchMovimientos} />
            <BottomMenu />

        </main>
    )
}

export default NuevoPage
