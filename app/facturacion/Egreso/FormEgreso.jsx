"use client";
import { crearMovimiento } from "@/app/utils/Api/Movimientos";
import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";

const FormEgreso = () => {
  const categorias = {"Pago Trabajo":1, "Compra Material":2, "Otro":3}; // 

  const [egreso, setEgreso] = useState({
    Descripcion: undefined,
    Valor: undefined,
    Tipo: "Egreso",
    Categoria: 0,

    Trabajador: undefined,
    IdTrabajo: undefined,
  });

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //validaciones
    if (!egreso.Descripcion) {
      setError("Ingrese una descripcion");
      return;
    }
    if (!egreso.Valor) {
      setError("Ingrese un valor");
      return;
    }
    if (egreso.Categoria === 0) {
      setError("Seleccione una categoria");
      return;
    }

    if(egreso.Categoria === 2 && !egreso.Trabajador){
      setError("Ingrese un Trabajador");
      return;
    }

    if(egreso.Categoria === 1 && egreso.IdTrabajo == ""){
      setError("Ingrese un id de trabajo");
      return;
    }


    setError(false);
    console.log(egreso);
    crearIngreso();
  }


  const crearIngreso = async () => {

    console.log(egreso);
    try {
      crearMovimiento(egreso);
      alert("Ingreso creado correctamente");
      setEgreso({
        Descripcion: "",
        Valor: "",
        Tipo: "Ingreso",
        Categoria: 0,
        
        Trabajador: "",
        IdTrabajo: "",
      });

    } catch (error) {
      console.log(error);
      alert("Error al crear el egreso");

    }


  }


  const handleInputChange = (e) => {
    //algunas validaciones
    setError(false);

    if (e.target.name === "Categoria") {
      setEgreso({
        ...egreso,
        [e.target.name]: parseInt(e.target.value),
      });
    
      return;
    }

    if (e.target.name === "Valor") {
      setEgreso({
        ...egreso,
        [e.target.name]: parseInt(e.target.value),
      });
    
      return;
    }

    setEgreso({
      ...egreso,
      [e.target.name]: e.target.value,
    });


      
    


  };



  return (
    
      <form className="flex flex-col gap-3 text-slate-300" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Descripcion"
          name="Descripcion"
          value={egreso.Descripcion}
          onChange={handleInputChange}
          variant="bordered"
          color="default"
        />

        <Input
          type="number"
          label="Valor"
          name="Valor"
          value={egreso.Valor}
          onChange={handleInputChange}
          variant="bordered"
          color="default"
        />


          <select
            name="Categoria"
            className="mb-4 p-3 rounded-md"
            onChange={handleInputChange}
            value={egreso.Categoria}
          >
            <option value="">Seleccione una categoria</option>
            {
              Object.keys(categorias).map((categoria, index) => (
                <option key={index} value={
                  //valor numerico de la categoria como numero
                  categorias[categoria]
                  

                  

                }>{categoria}</option>
              ))
            }
          </select>


        {egreso.Categoria === 2 && (
          <Input
            type="text"
            label="Trabajador"
            name="Trabajador"
           value={egreso.Trabajador}
            onChange={handleInputChange}
            variant="bordered"
            color="default"
          />
        )}

        {egreso.Categoria === 1 && (
          <Input
            type="text"
            label="Id Trabajo"
            name="IdTrabajo"
           value={egreso.IdTrabajo}
            onChange={handleInputChange}
            variant="bordered"
            color="default"
          />
        )}

        <Button variant="ghost" type="submit" color="danger">
          Guardar
        </Button>
        <span className="text-sm text-slate-50">{error}</span>
      </form>
    
  );
};

export default FormEgreso;
