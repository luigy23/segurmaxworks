"use client"
import React, { useState, useEffect } from 'react'
import { obtenerMovimientosPorId, actualizarMovimiento } from '@/app/utils/Api/Movimientos'
import { formatearPrecio } from '@/app/utils/Formateadores'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const MovimientoDetalle = ({ params })    => {
    const [movimiento, setMovimiento] = useState(null);
    const [formData, setFormData] = useState(null);
    const id = params.id;
    const router = useRouter();
    useEffect(() => {
        if (id) {
            obtenerMovimientosPorId(id).then((data) => {
                setMovimiento(data);
                setFormData(data);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSave = async () => {
        try {
            await actualizarMovimiento(id, formData);
        } catch (error) {
            console.error('Error updating movimiento:', error);
        }
    }

    if (!movimiento) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl mb-4'>Detalles del Movimiento</h1>
            <div className='flex flex-col gap-2'>
                <input
                    type="text"
                    name="Descripcion"
                    value={formData.Descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    className="input"
                />
                <input
                    type="number"
                    name="Valor"
                    value={formData.Valor}
                    onChange={handleChange}
                    placeholder="Valor"
                    className="input"
                />
                <input
                    type="date"
                    name="Date"
                    value={formData.Date}
                    onChange={handleChange}
                    placeholder="Fecha"
                    className="input"
                />
                <div>
                    <strong>Tipo:</strong> {movimiento.Tipo}
                </div>
                <div>
                    <strong>Categoría:</strong> {movimiento.Categoria}
                </div>
                <Button color="primary" onClick={handleSave}>
                    Guardar
                </Button>
                <Button color="danger" onClick={() => router.back()}>
                    Regresar
                </Button>
            </div>
        </div>
    )
}

export default MovimientoDetalle
