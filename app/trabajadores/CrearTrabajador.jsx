// En este componente habrá un formulario para crear un trabajador, los campos serán:
// Nombre (tambien es el id)
"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { insertarTrabajador } from "../utils/supabase";

const CrearTrabajador = () => {
  const [nombre, setNombre] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      return toast.error("El nombre es obligatorio");
    }
    const trabajador = {
      nombre,
    };
  
    //si hay un error en la insercion, se envia un throw error
    try {
      const res = await insertarTrabajador(trabajador);
      console.log(res);
      toast.success("Trabajador creado");
      setNombre("");
    } catch (error) {
      console.log(error); //ejemplo de error:  {code: '23505',details: 'Key (nombre)=(otro) already exists.',hint: null,message: 'duplicate key value violates unique constraint "Trabajadores_pkey"'}
      if (error.code === "23505") {
        return toast.error("El trabajador ya existe");
      }      
      toast.error("Hubo un error ");
    }

   

  };


  return (
    <>
    <form className="flex flex-col gap-2" onSubmit={handleSubmit} >
      <h3 className="text-2xl font-bold">Crear Trabajador</h3>
      <Input
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <Button variant="shadow" type="submit" color="danger">
        Guardar
      </Button>
    </form>
    <Toaster />
    </>
  );
};

export default CrearTrabajador;
