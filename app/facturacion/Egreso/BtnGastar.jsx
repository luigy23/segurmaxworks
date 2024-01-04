"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

import React from 'react'
import FormIngreso from "../Ingreso/FormIngreso";
import FormEgreso from "./FormEgreso";

const BtnGastar = () => {

const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
         <Button color='danger' onClick={onOpen}  >Gastar</Button>
         <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='dark'>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1 text-slate-50">Gastar</ModalHeader>
                <ModalBody>
                    <FormEgreso />
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

export default BtnGastar