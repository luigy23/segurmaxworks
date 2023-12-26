"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

import React from 'react'

const BtnFacturar = () => {

const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
         <Button color='success' onClick={onOpen}  >Facturar</Button>
         <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='dark'>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1 text-slate-50">Facturar</ModalHeader>
                <ModalBody>
                    Hola
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

export default BtnFacturar