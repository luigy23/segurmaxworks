import { agregarRegistro } from '@/app/utils/Api/Caja';
import { formatearPrecio } from '@/app/utils/Formateadores';
import { Button, Input } from '@nextui-org/react';
import { toast, Toaster } from 'react-hot-toast';
import React, { useState } from 'react';

const NuevoSaldoForm = ({ cargarSaldo }) => {
  const [saldo, setSaldo] = useState('');
  const [error, setError] = useState('');
  const [saldoMostrar, setSaldoMostrar] = useState('');

  const validarSaldo = (valor) => {
    if (!valor) {
      return 'El saldo es requerido';
    }
    if (isNaN(valor)) {
      return 'El saldo debe ser un número';
    }
    if (Number(valor) < 0) {
      return 'El saldo no puede ser negativo';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validacionError = validarSaldo(saldo);
    if (validacionError) {
      setError(validacionError);
      return;
    }

    try {
      agregarRegistro(saldo);
      toast.success('Saldo agregado');
      
    } catch (error) {
      toast.error('Error al agregar saldo');
      console.log(error);
    } finally {
      cargarSaldo();
    }

    setSaldo('');
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const validacionError = validarSaldo(value);
    if (validacionError) {
      setError(validacionError);
    } else {
      setError('');
    }
    setSaldo(value);
    const saldoFormateado = formatearPrecio(value);
    setSaldoMostrar(saldoFormateado);
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="w-full max-w-sm ">
      <div className="mb-6">
   
          
        
        <Input
            type="number"
            label="Saldo"
            placeholder="0.00"
            className='text-slate-300'
            variant="bordered"
            name="Saldo"
            value={saldo} // Muestra el valor con formato
            onChange={handleInputChange}
            color="success"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          
          <span className="text-success-600">{saldoMostrar}</span>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
          <Button type="submit" color="success" className="w-full">
            Agregar
          </Button>
    </form>
    <Toaster />
    </>
  );
};

export default NuevoSaldoForm;
