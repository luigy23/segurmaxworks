"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { formatearPrecio } from "@/app/utils/Formateadores";
import { parseDate, getLocalTimeZone, toDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { obtenerCategorias } from "@/app/utils/Api/Categoria";
import { insertarMovimiento } from "@/app/utils/Api/Movimientos";
import { useRouter } from "next/navigation";

const TecladoVirtual = ({ onEnterValue }) => {
  const [valor, setValor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(parseDate(new Date().toISOString().split("T")[0]));
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(new Set([]));
  const [categorias, setCategorias] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const hoy = new Date();
  const fechaFormateada = fechaSeleccionada
    .toDate(getLocalTimeZone())
    .toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" });
  const fechaDisplay = fechaSeleccionada.toDate(getLocalTimeZone()).toDateString() === hoy.toDateString() ? "Hoy" : fechaFormateada;

  useEffect(() => {
    obtenerCategorias().then((data) => {
      setCategorias(data);
    });
  }, []);

  const formatter = useDateFormatter({ dateStyle: "full" });
  const router = useRouter();

  const agregarValor = (valor) => {
    setValor((prev) => prev + valor);
  };

  const limpiarValor = () => {
    setValor("");
  };

  const borrarUltimoCaracter = () => {
    setValor((prev) => prev.slice(0, -1));
  };

  const cambiarFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    onOpenChange(false); // Cerrar el modal después de seleccionar la fecha
  };

  
  const manejarInsercionMovimiento = async () => {
    const movimiento = {
      created_at: new Date().toISOString(),
      Valor: valor,
      Tipo: "Ingreso", // Reemplaza con el valor adecuado
      Descripcion: descripcion,
      Categoria: [...categoriaSeleccionada][0], // Asumiendo que solo se selecciona una categoría
      Date: fechaSeleccionada.toDate(getLocalTimeZone()).toISOString().split('T')[0],
    };

    try {
      await insertarMovimiento(movimiento);
      alert("Movimiento insertado con éxito");
      router.push("/Nuevo");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al insertar el movimiento");
    }
  };

  return (
    <>
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col flex-grow p-4 space-y-4">
        <Select
          onSelectionChange={setCategoriaSeleccionada}
          selectedKeys={categoriaSeleccionada}
          placeholder="Selecciona una categoria"
          className="w-full"
        >
          {categorias.map((categoria) => (
            <SelectItem key={categoria.id}>{categoria.id}</SelectItem>
          ))}
        </Select>
        <div className="flex gap-2">
          <Input
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            className="flex-grow"
          />
          <Input readOnly value={formatearPrecio(valor)} className="" />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-smoke-900 p-4 shadow-lg">
        <div className="grid grid-cols-4 gap-2">
          {"1234567890".split("").map((num) => {
            if (num === "3") {
              return (
                <Fragment key={num}>
                  <Button onClick={() => agregarValor(num)} className="w-full">
                    {num}
                  </Button>
                  <Button onClick={borrarUltimoCaracter} color="warning" className="w-full">
                    Borrar
                  </Button>
                </Fragment>
              );
            }
            if (num === "6") {
              return (
                <Fragment key={num}>
                  <Button onClick={() => agregarValor(num)} className="w-full">
                    {num}
                  </Button>
                  <Button onClick={limpiarValor} color="error" className="w-full">
                    Clear
                  </Button>
                </Fragment>
              );
            }
            if (num === "9") {
              return (
                <Fragment key={num}>
                  <Button onClick={() => agregarValor(num)} className="w-full">
                    {num}
                  </Button>
                  <Button onClick={onOpen} variant="flat" color="secondary" className="w-full">
                    {fechaDisplay}
                  </Button>
                </Fragment>
              );
            }
            return (
              <Button key={num} onClick={() => agregarValor(num)} className="w-full">
                {num}
              </Button>
            );
          })}
        </div>
        <div className="flex mt-4">
          <Button onClick={manejarInsercionMovimiento} color="primary" className="w-full">
            Enter
          </Button>
        </div>
      </div>
    </div>

    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Selecciona una fecha
            </ModalHeader>
            <ModalBody>
              <DatePicker
                value={fechaSeleccionada}
                onChange={cambiarFecha}
                className="max-w-[284px]"
              />
              <p className="text-default-500 text-sm">
                Fecha seleccionada:{" "}
                {fechaSeleccionada
                  ? formatter.format(fechaSeleccionada.toDate(getLocalTimeZone()))
                  : "--"}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
  );
};

export default TecladoVirtual;
