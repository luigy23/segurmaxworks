import { formatearPrecio } from '@/app/utils/Formateadores'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

import React from 'react'
import NuevoSaldoForm from './NuevoSaldoForm';
const BtnSaldo = ({saldo, cargarSaldo}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <div className="flex justify-between shadow-md p-4 bg-smoke-700 hover:bg-smoke-800  transition-all 
    hover:shadow-lg duration-300  hover:border-success-300 border-2 border-transparent
    ease-in-out  rounded-lg cursor-pointer" 
    onClick={onOpen}
    >
    <h2 className="text-2xl font-bold"
    >Saldo: 
      <span className="text-2xl font-bold text-success-300"> 
      {
       formatearPrecio(saldo)
      }
      </span>
    </h2>
    </div>

    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='dark'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-slate-50">Iniciar Caja</ModalHeader>
              <ModalBody>
                <NuevoSaldoForm cargarSaldo={cargarSaldo} />
              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    
    </>
  )
}

export default BtnSaldo


