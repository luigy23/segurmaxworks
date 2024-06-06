"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@nextui-org/react";
import { toast, Toaster } from 'react-hot-toast';
import {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "@/app/utils/Api/Categoria";
import BottomMenu from "../Componentes/BottomMenu";

const CrudCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    const data = await obtenerCategorias();
    setCategorias(data);
  };

  const manejarCrearCategoria = async () => {
    try {
      const nuevaCategoria = { id: nombreCategoria };
      await crearCategoria(nuevaCategoria);
      setNombreCategoria("");
      cargarCategorias();
      toast.success("Categoría creada con éxito");
    } catch (error) {
      toast.error("Error al crear la categoría");
    }
  };

  const manejarActualizarCategoria = async () => {
    if (!categoriaSeleccionada) return;
    try {
      await actualizarCategoria(categoriaSeleccionada.id, { id: nombreCategoria });
      setNombreCategoria("");
      setCategoriaSeleccionada(null);
      onOpenChange(false);
      cargarCategorias();
      toast.success("Categoría actualizada con éxito");
    } catch (error) {
      toast.error("Error al actualizar la categoría");
    }
  };

  const manejarEliminarCategoria = async (id) => {
    try {
      await eliminarCategoria(id);
      cargarCategorias();
      toast.success("Categoría eliminada con éxito");
    } catch (error) {
      toast.error("Error al eliminar la categoría");
    }
  };

  const abrirModal = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setNombreCategoria(categoria.id);
    onOpen();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD de Categorías</h1>
      <div className="flex mb-4">
        <Input
          placeholder="Nombre de la categoría"
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={manejarCrearCategoria} className="ml-2">
          Crear
        </Button>
      </div>
      <Table aria-label="Tabla de Categorías">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {categorias.map((categoria) => (
            <TableRow key={categoria.id}>
              <TableCell>{categoria.id}</TableCell>
              <TableCell>
                <Button
                  onClick={() => abrirModal(categoria)}
                  color="primary"
                  className="mr-2"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => manejarEliminarCategoria(categoria.id)}
                  color="error"
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Categoría
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Nombre de la categoría"
                  value={nombreCategoria}
                  onChange={(e) => setNombreCategoria(e.target.value)}
                  className="w-full"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={manejarActualizarCategoria}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        <Toaster />
        <BottomMenu />
    </div>
  );
};

export default CrudCategorias;
