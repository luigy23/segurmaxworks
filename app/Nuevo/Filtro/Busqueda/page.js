"use client";
import { useState } from "react";
import BottomMenu from "../../Componentes/BottomMenu";
import MenuFiltros from "../../Componentes/MenuFiltros";
import { Button, DatePicker, Input } from "@nextui-org/react";
import MovimientosPorFecha from "../../Componentes/MovimientosPorFecha";
import { obtenerMovimientosPorTexto } from "@/app/utils/Api/Movimientos";

const pageBusqueda = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const traerMovimientos = async () => {
    if (busqueda) {
      // Implementa tu lógica para obtener los movimientos aquí
      obtenerMovimientosPorTexto(busqueda).then((res) => {
        setMovimientos(res);
      });
    }
  };

  return (
    <main className="flex flex-col items-center gap-4 bg-smoke-800 h-[calc(100vh-4rem)] p-4 text-slate-50 dark">
      <MenuFiltros />

      <div className="flex gap-2 w-4/6">
        <form
        className="flex gap-2 w-full items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            traerMovimientos();
          }}
        >
          <Input
            label="Buscar Movimientos"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button
            type="submit"
            className="text-smoke-200 hover:text-slate-50"
            variant="ghost"
            onClick={traerMovimientos}
          >
            Buscar
          </Button>
        </form>
      </div>

      <MovimientosPorFecha
        movimientos={movimientos}
        onMovimientoUpdated={traerMovimientos}
      />

      <BottomMenu />
    </main>
  );
};

export default pageBusqueda;
