"use client"

import { useEffect, useState } from "react"


import Trabajo from "./Trabajo"
import { Divider } from "@nextui-org/react"
import { obtenerTrabajosPorFecha } from "../utils/supabase"
const AgendaPage = () => {
    const [trabajos, setTrabajos] = useState([])
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const cargarTrabajos = async () => {
            try {
                const trabajosObtenidos = await obtenerTrabajosPorFecha(fechaSeleccionada);
                setTrabajos(trabajosObtenidos);
            } catch (err) {
                setError('Error al cargar los trabajos.');
                console.error(err);
            }
        };

        cargarTrabajos();
    }, [fechaSeleccionada]);



    const handleDateChange = (event) => {
        setFechaSeleccionada(event.target.value);
    };


    return (
        <main className="flex flex-col items-center  bg-smoke-800 text-slate-50 h-screen dark">
            <h1 className='text-3xl font-semibold mb-4 p-3'>Agenda</h1>

            <div>
                <input
                    type="date"
                    className="mb-4 p-3 rounded-md"
                    value={fechaSeleccionada}
                    onChange={handleDateChange}
                />
                {error && <div>{error}</div>}
            </div>

            <Divider />


            <div className="flex flex-col gap-2 items-center mb-4 w-5/6 ">
                {
                    trabajos.length === 0 ? <h2>No hay trabajos para hoy</h2> :
                        trabajos.map((item, index) => {
                            return (
                                <Trabajo key={index} index={index} item={item} />
                            )
                        })
                }
            </div>





        </main>
    )
}

export default AgendaPage