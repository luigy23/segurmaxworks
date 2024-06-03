"use client";
import { useState } from "react";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, DatePicker } from "@nextui-org/react";
import { formatearPrecio } from "@/app/utils/Formateadores";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

const TecladoVirtual = ({ onEnterValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputNombre, setInputNombre] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(parseDate("2024-04-04"));

  let formatter = useDateFormatter({ dateStyle: "full" });

  const handleButtonClick = (value) => {
    setInputValue((prev) => prev + value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onOpenChange(false); // Cerrar el modal después de seleccionar la fecha
  };

  return (
    <>
      <div className="flex gap-2 justify-between items-center">
        <Input
          onChange={(e) => setInputNombre(e.target.value)}
          placeholder="Descripcion"
          className="w-1/2"
        />
        <Input readOnly value={formatearPrecio(inputValue)} />
      </div>

      <div>
        <div className="grid grid-cols-4 gap-2">
          {"1234567890".split("").map((num) => {
            if (num === "3") {
              return (
                <>
                  <Button
                    key={num}
                    onClick={() => handleButtonClick(num)}
                    className="w-full"
                  >
                    {num}
                  </Button>
                  <Button
                    onClick={handleBackspace}
                    color="warning"
                    className="flex-1"
                  >
                    Borrar
                  </Button>
                </>
              );
            }
            if (num === "6") {
              return (
                <>
                  <Button
                    key={num}
                    onClick={() => handleButtonClick(num)}
                    className="w-full"
                  >
                    {num}
                  </Button>
                  <Button
                    onClick={handleClear}
                    color="error"
                    className="flex-1"
                  >
                    Clear
                  </Button>
                </>
              );
            }
            if (num === "9") {
              return (
                <>
                  <Button
                    key={num}
                    onClick={() => handleButtonClick(num)}
                    className="w-full"
                  >
                    {num}
                  </Button>
                  <Button
                    onClick={onOpen}
                    variant="flat"
                    color="secondary"
                    className="flex-1"
                  >
                    Hoy
                  </Button>
                </>
              );
            }
            return (
              <Button
                key={num}
                onClick={() => handleButtonClick(num)}
                className="w-full"
              >
                {num}
              </Button>
            );
          })}
        </div>
        <div className="flex space-x-2 mt-2">
          <Button
            onClick={() => onEnterValue(inputValue)}
            color="primary"
            className="flex-1"
          >
            Enter
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Selecciona una fecha</ModalHeader>
              <ModalBody>
                <DatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="max-w-[284px]"
                />
                <p className="text-default-500 text-sm">
                  Fecha seleccionada: {selectedDate ? formatter.format(selectedDate.toDate(getLocalTimeZone())) : "--"}
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
