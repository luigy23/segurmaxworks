import { formatearPrecio } from "@/app/utils/Formateadores";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  actualizarMovimiento,
  eliminarMovimiento,
} from "@/app/utils/Api/Movimientos";
import { useRouter } from "next/navigation";
import { obtenerCategorias } from "@/app/utils/Api/Categoria";

const Movimiento = ({ movimiento, onMovimientoUpdated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  
  const [formData, setFormData] = useState({ ...movimiento });
  //const router = useRouter();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(new Set([]));
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    obtenerCategorias().then((data) => {
      setCategorias(data);
    });
  }, []);

  const handleClic = () => {
   // router.push(`Nuevo/Movimientos/${movimiento.id}`);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {

    formData.Categoria = Array.from(categoriaSeleccionada)[0];

    try {
      await actualizarMovimiento(movimiento.id, formData);
      onMovimientoUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating movimiento:", error);
    }
  };

  const handleDeleteConfirmation = () => {
    onDeleteOpen();
  };

  const handleDelete = async () => {
    try {
      await eliminarMovimiento(movimiento.id);
      onMovimientoUpdated();
      onClose();
      onDeleteClose();
    } catch (error) {
      console.error("Error deleting movimiento:", error);
    }
  };

  return (
    <>
      <div
        key={movimiento.id}
        className="bg-slate-50 py-2 px-4 rounded-md text-smoke-500"
        onContextMenu={handleRightClick}
        onClick={handleClic}
      >
        <div className="flex justify-between items-center gap-2">
          <span>{movimiento.Descripcion}</span>
          <Chip>{movimiento.Categoria}</Chip>
        </div>
        <div className="flex justify-between items-center gap-2">
          <Chip className="text-shamrock-800 bg-shamrock-300 font-semibold">
            {formatearPrecio(movimiento.Valor)}
          </Chip>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Movimiento
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="Descripcion"
                    value={formData.Descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    className="input"
                  />
                  <input
                    type="number"
                    name="Valor"
                    value={formData.Valor}
                    onChange={handleChange}
                    placeholder="Valor"
                    className="input"
                  />
                  <input
                    type="date"
                    name="Date"
                    value={formData.Date}
                    onChange={handleChange}
                    placeholder="Fecha"
                    className="input"
                  />
                  <Select
                    onSelectionChange={setCategoriaSeleccionada}
                    selectedKeys={categoriaSeleccionada}
                    placeholder={formData.Categoria}
                    className="w-full"
                  >
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id}>{categoria.id}</SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={handleDeleteConfirmation}
                >
                  Eliminar
                </Button>
                <Button color="primary" onClick={handleSave}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          {(onDeleteClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirmar Eliminación
              </ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de que deseas eliminar este movimiento?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onDeleteClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={handleDelete}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Movimiento;
