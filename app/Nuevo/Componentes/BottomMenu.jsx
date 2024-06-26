// components/BottomMenu.js
import { HouseIcon } from "@/app/Assets/Icons/HouseIcon";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NewIcon } from "@/app/Assets/Icons/NewIcon";

const BottomMenu = () => {
  const router = useRouter();
  const handleNewMovement = () => {
    router.push("/Nuevo/NuevoMovimiento");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto px-4">
        <MenuItem2
          link={"/Nuevo/Categorias"}
          icon={<NewIcon className="h-6 w-6 text-gray-600" />}
          label="Categorias"
        />
        <MenuItem
          onClick={handleNewMovement}
          icon={
            <div className=" items-center justify-center text-center flex rounded-full text-4xl bg-smoke-800 pb-2 text-slate-50 h-20 w-20">
              <span className="text-4xl hover:bg-shamrock-800 transition-colors ease-in-out cursor-pointer bg-slate-700 w-12 h-12 rounded-full">
                +
              </span>
            </div>
          }
          label=""
          isCenter={true}
        />
        <MenuItem2
          link={"/Nuevo/"}
          icon={<HouseIcon className="h-6 w-6 text-gray-600" />}
          label="Inicio"
        />
      </div>
    </nav>
  );
};

const MenuItem = ({ icon, label, isCenter, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center ${
      isCenter ? "transform translate-y-[-20px]" : ""
    }`}
  >
    {icon}
    {label && <span className="text-xs text-gray-600">{label}</span>}
  </div>
);

const MenuItem2 = ({ icon, link, isCenter, label }) => (
  <Link
    href={link}
    className={`flex flex-col items-center min-w-20 ${
      isCenter ? "transform translate-y-[-20px]" : ""
    }`}
  >
    {icon}
    {label && <span className="text-xs text-gray-600">{label}</span>}
  </Link>
);

export default BottomMenu;
