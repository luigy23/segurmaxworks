"use client"
import React, { useEffect, useState } from 'react'
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { obtenerTrabajadores } from '../utils/supabase';

const SelectTrabajadores = ({value, setValue}) => {

    const [trabajadores, setTrabajadores] = useState([])

    const onChangeSelect = (item) => {
        console.log(item)
        setValue(item)
        }

    useEffect(() => {
      obtenerTrabajadores().then((res) => {
        setTrabajadores(res)
        console.log(res)
      }
      )
    }
    , [])
  return (
    <Autocomplete 
    label="Selecciona un trabajador"
    className="max-w-xs" 
    value={value}
    onSelectionChange={onChangeSelect}>
    { trabajadores &&
    
    trabajadores.map((item, index) => (
      <AutocompleteItem key={item.nombre} value={item.nombre} >
        {item.nombre}
      </AutocompleteItem>
    ))}
    
  </Autocomplete>
  )
}

export default SelectTrabajadores