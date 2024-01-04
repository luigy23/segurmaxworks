import { formatearFecha, formatearPrecio } from "@/app/utils/Formateadores";
import React from "react";

const Movimiento = ({ movimiento }) => {
  const formatearFechaHora = (fecha) => {
    // formato recibido: 2023-12-21T23:58:15+00:00
    // formato esperado: 21/12/2023 23:58:15
    const fechaHora = fecha.split("T");
    const fechaFormateada = formatearFecha(fechaHora[0]);
    const hora = fechaHora[1].split("+");
    const horaFormateada = hora[0];
    return `${fechaFormateada} `;
  };

  

  const estilos = {
    Ingreso: "bg-success-300",
    Egreso: "bg-red-500",
  };

  return (
    <div
     
      className={`flex  justify-between items-center gap-2 p-3 rounded-lg cursor-pointer ${estilos[movimiento.Tipo]}`}
    >
      <p>{movimiento.Descripcion}</p>
    
      <p className=
      {(movimiento.Tipo === "Ingreso" ? "bg-success-500" : "bg-red-300")+  " text-smoke-800 rounded-3xl px-2 py-1"}>
        {formatearPrecio(movimiento.Valor)}</p>
      <p>⌚{formatearFechaHora(movimiento.created_at)}</p>
    </div>
  );
};

export default Movimiento;
