import React from "react";

const Producto = ({ producto }) => {
  return (
    <div className="p-2 bg-gray-100 rounded-lg text-smoke-800 font-semibold md:w-8/12 flex justify-between gap-2 items-center shadow-lg hover:transform hover:scale-105 transition duration-300 cursor-pointer">
      <span className="text-sm px-2 py-1 rounded-xl text-danger-800 font-normal bg-danger-600">
        Id: {producto.id}
      </span>
      <div className="w-40 flex justify-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {producto.Nombre}
      </div>

      <span className="text-sm px-2 py-1 rounded-xl text-success-800 font-normal bg-success-400">
        <span className="hidden md:inline">Precio:</span> ${producto.Precio}
      </span>
      <span className="text-sm px-2 py-1 rounded-full text-primary-400 font-normal bg-slate-50  border-2 border-primary-400">
        <span className="hidden md:inline">Stock:</span> {producto.Stock}
      </span>
    </div>
  );
};

export default Producto;
