"use client";
import { crearMovimiento } from "@/app/utils/Api/Movimientos";
import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";

const FormIngreso = () => {
  const categorias = {"Trabajo":1, "Venta":2, "Otro":3}; // 

  const [ingreso, setIngreso] = useState({
    Descripcion: undefined,
    Valor: undefined,
    Tipo: "Ingreso",
    Categoria: 0,

    Trabajador: undefined,
    IdTrabajo: undefined,
  });

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //validaciones
    if (!ingreso.Descripcion) {
      setError("Ingrese una descripcion");
      return;
    }
    if (!ingreso.Valor) {
      setError("Ingrese un valor");
      return;
    }
    if (ingreso.Categoria === 0) {
      setError("Seleccione una categoria");
      return;
    }

    if(ingreso.Categoria === 2 && !ingreso.Trabajador){
      setError("Ingrese un Trabajador");
      return;
    }

    if(ingreso.Categoria === 1 && ingreso.IdTrabajo == ""){
      setError("Ingrese un id de trabajo");
      return;
    }


    setError(false);
    console.log(ingreso);
    crearIngreso();
  }


  const crearIngreso = async () => {

    console.log(ingreso);
    try {
      crearMovimiento(ingreso);
      alert("Ingreso creado correctamente");
      setIngreso({
        Descripcion: "",
        Valor: "",
        Tipo: "Ingreso",
        Categoria: 0,
        
        Trabajador: "",
        IdTrabajo: "",
      });

    } catch (error) {
      console.log(error);
      alert("Error al crear el ingreso");

    }


  }


  const handleInputChange = (e) => {
    //algunas validaciones
    setError(false);

    if (e.target.name === "Categoria") {
      setIngreso({
        ...ingreso,
        [e.target.name]: parseInt(e.target.value),
      });
    
      return;
    }

    if (e.target.name === "Valor") {
      setIngreso({
        ...ingreso,
        [e.target.name]: parseInt(e.target.value),
      });
    
      return;
    }

    setIngreso({
      ...ingreso,
      [e.target.name]: e.target.value,
    });


      
    


  };



  return (
    
      <form className="flex flex-col gap-3 text-slate-300" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Descripcion"
          name="Descripcion"
          value={ingreso.Descripcion}
          onChange={handleInputChange}
          variant="bordered"
          color="default"
        />

        <Input
          type="number"
          label="Valor"
          name="Valor"
          value={ingreso.Valor}
          onChange={handleInputChange}
          variant="bordered"
          color="default"
        />


          <select
            name="Categoria"
            className="mb-4 p-3 rounded-md"
            onChange={handleInputChange}
            value={ingreso.Categoria}
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


        {ingreso.Categoria === 2 && (
          <Input
            type="text"
            label="Trabajador"
            name="Trabajador"
           value={ingreso.Trabajador}
            onChange={handleInputChange}
            variant="bordered"
            color="default"
          />
        )}

        {ingreso.Categoria === 1 && (
          <Input
            type="text"
            label="Id Trabajo"
            name="IdTrabajo"
           value={ingreso.IdTrabajo}
            onChange={handleInputChange}
            variant="bordered"
            color="default"
          />
        )}

        <Button variant="ghost" type="submit" color="success">
          Guardar
        </Button>
        <span className="text-sm text-slate-50">{error}</span>
      </form>
    
  );
};

export default FormIngreso;
