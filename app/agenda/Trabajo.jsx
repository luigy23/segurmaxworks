import { Card, CardBody, CardHeader, CardFooter, Chip, Divider } from "@nextui-org/react"
import { formatearFecha, formatearHora, formatearPrecio } from "../utils/Formateadores"
import { chips } from "../page"


const Trabajo = ({item, index}) => {
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
    <CardFooter>{formatearFecha(item.Fecha)+" - "+ formatearHora(item.Hora)}</CardFooter>
</Card>
  )
}

export default Trabajo