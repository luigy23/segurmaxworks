"use client"

import { useEffect, useState } from "react"
import { traerTrabajosporFecha } from "../utils/supabase"
import { formatearFecha, formatearPrecio } from "../utils/Formateadores"
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle, CardFooter, Chip, Divider, Button } from "@nextui-org/react"
import { chips } from "../page"
const AgendaPage = () => {
    const [trabajos, setTrabajos] = useState([])
    const [fecha, setFecha] = useState('')

    useEffect(() => {

        const fechaHoy = new Date();
        //restamos 5 horas para que la fecha sea la correcta
        fechaHoy.setHours(fechaHoy.getHours() - 5)
        const fechaFormateada = fechaHoy.toISOString()
        console.log(fechaFormateada)
        
        traerTrabajosporFecha(fechaFormateada).then((res) => {
            console.log(res)
            setTrabajos(res)
        }).catch((err) => {
            console.log(err)
        })



        return () => {

        }
    }, [])

    const handleInputChange = (event) => {
        setFecha(event.target.value)
        console.log(event.target.value)
        traerTrabajosporFecha(event.target.value).then((res) => {
            console.log(res)
            setTrabajos(res)
        }).catch((err) => {
            console.log(err)
        })
    }



    return (
        <main className="flex flex-col items-center  bg-smoke-800 text-slate-50 h-screen dark">
            <h1 className='text-3xl font-semibold mb-4 p-3'>Agenda</h1>
            {/* input de tipo date */}
            <Divider/>
            <div className="flex flex-col gap-2 mb-4 pt-4">   
            <label htmlFor="fecha">Trabajos desde:</label>
            <input type="date" name="fecha" id="fecha" onChange={handleInputChange} value={fecha} className=" mb-4 p-3 rounded-md" />
           

            </div>

            <div className="flex  flex-col gap-2 items-center mb-4 w-5/6 ">
            {
                trabajos.length === 0 ? <h2>No hay trabajos para hoy</h2> :
                trabajos.map((item, index) => {
                    return (
                        <Card key={index} className='w-5/6 bg-slate-700 ' isFooterBlurred >
                            <CardHeader className="gap-2 p-2">
                                <h3>{item.Trabajador}</h3>
                                <Chip color='warning' className="bg-slate-100">{formatearPrecio(item.Precio)}</Chip>
                            </CardHeader>
                            <Divider />
                            <CardBody className="p-2" >
                                {item.Descripcion}
                                {chips[item.Estado]}
                            </CardBody>
                            <CardFooter>{formatearFecha(item.Fecha)}</CardFooter>
                        </Card>
                    )
                })
            }
            </div>





        </main>
    )
}

export default AgendaPage