"use client";
import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";

const FormIngreso = () => {
  const categorias = ["Sueldo", "Venta", "Otro"];

  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState(0);
  const [fecha, setFecha] = useState(new Date());
  const [categoria, setCategoria] = useState("");
  const [vendedor, setVendedor] = useState(""); //opcional solo para ventas
  const [idTrabajo, setIdTrabajo] = useState(""); //opcional solo para Sueldo

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  }

  const handleInputChange = (e) => {
    console.log(e.target.value);
  };



  return (
    <div>
      <form className="flex flex-col w-[80%] gap-2" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Concepto"
          name="concepto"
        
          onChange={handleInputChange}
          variant="bordered"
          color="default"
        />

        <Input
          type="number"
          label="Monto"
          name="monto"
        
          onChange={handleInputChange}
          variant="bordered"
          color="default"
        />

        <label htmlFor="fecha" className="flex flex-col mt-2 md:-mt-1">
          Fecha
          <input
            type="date"
            name="fecha"
            id="fecha"
            className="mb-4 p-3 rounded-md"
            
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="categoria" className="flex flex-col mt-2 md:-mt-1">
          Categoria
          <select

            name="categoria"
            id="categoria"
            className="mb-4 p-3 rounded-md"
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccione una categoria</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </label>

        {categoria === "Venta" && (
          <Input
            type="text"
            label="Vendedor"
            name="vendedor"
           
            onChange={handleInputChange}
            variant="bordered"
            color="default"
          />
        )}

        {categoria === "Sueldo" && (
          <Input
            type="text"
            label="Id Trabajo"
            name="idTrabajo"
           
            onChange={handleInputChange}
            variant="bordered"
            color="default"
          />
        )}

        <Button variant="shadow" type="submit" color="danger">
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default FormIngreso;
