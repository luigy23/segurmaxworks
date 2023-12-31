"use client";
import React, { useState } from "react";
import NavBar from "../Componentes/NavBar";
import { Button, Input, Textarea } from "@nextui-org/react";
import { insertarTrabajo } from "../utils/supabase";
import toast, { Toaster } from "react-hot-toast";
import { formatearPrecio } from "../utils/Formateadores";
import SelectTrabajadores from "../Componentes/SelectTrabajadores";

const New = () => {
  const [formulario, setFormulario] = useState({
    Descripcion: "",
    Precio: "",
    Fecha: "", // Solo la fecha
    Hora: "", // Solo la hora
  });
  const [precioMostrado, setPrecioMostrado] = useState("");
  const [trabajador, setTrabajador] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;

    if (name === "Precio") {
      setFormulario({
        ...formulario,
        Precio: value, // Guarda el valor numérico sin formato
      });
      setPrecioMostrado(formatearPrecio(value)); // Actualiza el valor mostrado con formato
      return;
    }

    setFormulario({
      ...formulario,
      [name]: newValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Asignar fecha actual si no se proporciona
    const datosAEnviar = {
      ...formulario,
      Fecha: formulario.Fecha || new Date().toISOString().split("T")[0], // Fecha actual si no se proporciona
      Estado: 0,
      Trabajador: trabajador,
    };

    console.log(datosAEnviar);

    try {
      const data = await insertarTrabajo(datosAEnviar);
      console.log(data);
      toast.success("Trabajo agregado");
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar el trabajo");
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center bg-smoke-800 text-slate-50 h-[calc(100vh-4rem)] h- dark">
        <h1 className="text-3xl font-semibold mb-2">Nuevo</h1>
        <form className="flex flex-col w-[80%] gap-2" onSubmit={handleSubmit}>
          <Input
            type="text"
            value={formulario.Descripcion}
            onChange={handleInputChange}
            variant="bordered"
            color="default"
            label="Descripcion"
            minRows={1}
            name="Descripcion"
          />

          <Input
            type="number"
            label="Precio"
            placeholder="0.00"
            variant="bordered"
            name="Precio"
            value={formulario.Precio} // Muestra el valor con formato
            onChange={handleInputChange}
            color="success"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          <span className="text-success-600">{precioMostrado}</span>
          <div className="md:flex gap-2 md:gap-10 items-center ">
            <SelectTrabajadores value={trabajador} setValue={setTrabajador} />

            <div className=" flex-col md:flex gap-4 ">
              <label htmlFor="fecha" className="flex flex-col mt-2 md:-mt-1">
                Fecha
                <input
                  type="date"
                  name="Fecha"
                  id="fecha"
                  className="mb-4 p-3 rounded-md"
                  value={formulario.Fecha}
                  onChange={handleInputChange}
                />
              </label>
              <label htmlFor="hora" className="flex flex-col md:-mt-1">
                Hora
                <input
                  type="time"
                  name="Hora"
                  id="hora"
                  className="mb-4 p-3 rounded-md"
                  value={formulario.Hora}
                  onChange={handleInputChange}
                />
              </label>

            </div>
          </div>

          <Button variant="shadow" type="submit" color="danger">
            Guardar
          </Button>
        </form>

        {/* aqui mostramos el objeto 
        <pre className="w-[80%] whitespace-pre-wrap flex flex-col flex-wrap overflow-hidden">
          {
            JSON.stringify(json, null, 2)
            //remplazamos precio por el precio formateado
          }
        </pre>
        */}
      </main>
      <Toaster />
    </>
  );
};

export default New;
