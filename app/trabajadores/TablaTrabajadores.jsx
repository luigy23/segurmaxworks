//esta tabla mostrara los trabajadores que estan en la base de datos, y permitira editarlos y eliminarlos
"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react";
import React from "react";
import { eliminarTrabajador, obtenerTrabajadores } from "../utils/supabase";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EditIcon } from "../Assets/Icons/EditIcon";
import { DeleteIcon } from "../Assets/Icons/DeleteIcon";

const TablaTrabajadores = () => {
  const [trabajadores, setTrabajadores] = useState([]);

  const onClickEliminar = async (nombre) => {
    // Ventana de confirmación
    if (!window.confirm("¿Estás seguro de eliminar el trabajador?")) {
      return;
    }

    try {
      // Intentar eliminar el trabajador
      const res = await eliminarTrabajador(nombre);
      toast.success("Trabajador eliminado");

      // Actualizar la tabla
      const trabajadoresActualizados = await obtenerTrabajadores();
      setTrabajadores(trabajadoresActualizados);
    } catch (error) {
      // Manejar el error
      console.log(error);
      if (error.code === "23503") {
        return toast.error(
          "No se puede eliminar el trabajador porque tiene Trabajos registrados"
        );
      }
      toast.error("Hubo un error al eliminar el trabajador: " + error.message);
    }
  };

  useEffect(() => {
    obtenerTrabajadores().then((res) => {
      setTrabajadores(res);
      console.log(res);
      //los datos de un trabajador son: nombre (tambien es su id)
    });
  }, []);

  return (
    <div>
      {trabajadores && trabajadores.length > 0 ? (
        <Table>
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Acciones</TableColumn>
            <TableColumn>
              <Button
                className="ml-2 text-xl"
                radius="full"
                color="success"
                variant="faded"
                size="sm"
                isIconOnly
                onClick={() => {
                  obtenerTrabajadores().then((res) => {
                    setTrabajadores(res);
                    console.log(res);
                    //los datos de un trabajador son: nombre (tambien es su id)
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.188-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20Z"
                  />
                </svg>
              </Button>
            </TableColumn>
          </TableHeader>
          <TableBody>
            {trabajadores.map((trabajador) => (
              <TableRow key={trabajador.nombre}>
                <TableCell>{trabajador.nombre}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Button  isIconOnly className="text-lg" color="success">
                        <EditIcon />
                    </Button>
                    <Button color="danger" className="text-lg" isIconOnly onClick={() => onClickEliminar(trabajador.nombre)}>
                        <DeleteIcon/>
                    </Button>
                  </div>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h3>No hay trabajadores</h3>
      )}
      <Toaster />
    </div>
  );
};

export default TablaTrabajadores;
