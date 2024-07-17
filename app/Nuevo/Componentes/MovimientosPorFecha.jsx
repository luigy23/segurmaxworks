import React from 'react'
import Movimiento from './Movimiento'
import { groupByDate } from '@/app/utils/Formateadores'

const MovimientosPorFecha = ({ movimientos, onMovimientoUpdated }) => {
    if ( movimientos === undefined || movimientos.length === 0 || movimientos === null) {
        return <div className='text-center text-smoke-400'>No hay movimientos</div>

    }
    const groupedMovements = groupByDate(movimientos)

    return (
        groupedMovements === undefined ? <div className='text-center text-smoke-400'>No hay movimientos</div> :
        <div className='flex flex-col gap-2 w-full'>
            {Object.keys(groupedMovements).map(date => (
                <div key={date} className='bg-transparent p-4 flex flex-col gap-2'>
                    <h2 className='font-semibold '>{date}</h2>
                    {groupedMovements[date].map((movimiento) => (
                        <Movimiento key={movimiento.id} movimiento={movimiento} onMovimientoUpdated={onMovimientoUpdated} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default MovimientosPorFecha
