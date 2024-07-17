"use client";
import React, { useEffect, useState } from 'react';
import BottomMenu from '../../Componentes/BottomMenu';
import MenuFiltros from '../../Componentes/MenuFiltros';
import { Button, DatePicker } from '@nextui-org/react';
import MovimientosPorFecha from '../../Componentes/MovimientosPorFecha';
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { obtenerMovimientosPorFecha } from '@/app/utils/Api/Movimientos';

const pageFiltroFecha = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [desde, setDesde] = useState(null);
  const [hasta, setHasta] = useState(null);

  let formatter = useDateFormatter({ dateStyle: "full" });

  const traerMovimientos = async () => {
    if (desde && hasta) {
      // Formatear las fechas a 'YYYY-MM-DD'
      const desdeFormatted = formatter.format(desde.toDate(getLocalTimeZone())).split(',')[0];
      const hastaFormatted = formatter.format(hasta.toDate(getLocalTimeZone())).split(',')[0];

      // Aquí puedes realizar la lógica para obtener los movimientos con las fechas formateadas
      console.log("Movimientos desde: ", desdeFormatted);
      console.log("Movimientos hasta: ", hastaFormatted);
      // Implementa tu lógica para obtener los movimientos aquí
      obtenerMovimientosPorFecha(desde, hasta).then((res) => {
        setMovimientos(res);
        console.log(res);
      });


        
    }
  };


  return (
    <main className='flex flex-col items-center gap-4 bg-smoke-800 h-[calc(100vh-4rem)] p-4 text-slate-50 dark'>
      <MenuFiltros />

      <div className='flex gap-2 w-4/6'>
        <DatePicker label="Movimientos Desde:" value={desde} onChange={setDesde} />
        <DatePicker label="Hasta" value={hasta} onChange={setHasta} />
      </div>
      <Button className='text-smoke-200 hover:text-slate-50' variant='ghost' onClick={traerMovimientos}>
        Buscar
      </Button>
      <MovimientosPorFecha movimientos={movimientos} onMovimientoUpdated={traerMovimientos} />


      <BottomMenu />
    </main>
  );
};

export default pageFiltroFecha;
