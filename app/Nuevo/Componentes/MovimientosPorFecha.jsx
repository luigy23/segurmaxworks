import React from 'react'
import Movimiento from './Movimiento'

const MovimientosPorFecha = ({ groupedMovements, onMovimientoUpdated }) => {
    return (
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
