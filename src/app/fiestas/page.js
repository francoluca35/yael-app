"use client";
import { Suspense } from "react";
import FiestaForm from "./components/FiestaForm";
import BackButton from "../components/BackButton";

export default function Fiesta() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e0d8] to-[#d0d0f0] px-4">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>

      <div className="w-full max-w-md space-y-6 p-6 bg-white shadow-xl rounded-2xl">
        <div className="bg-[#2f3f6b] text-white p-4 rounded-xl flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-[#2f3f6b] rounded-full p-3 text-xl">
              ⚽
            </div>
            <div className="text-left">
              <p className="font-semibold text-lg">Reserva de cumpleaños</p>
              <p className="text-sm">10% Descuento - Sábados y Domingos</p>
              <p className="text-sm">Lunes a Domingo</p>
            </div>
          </div>
        </div>

        <Suspense fallback={<div>Cargando formulario...</div>}>
          <FiestaForm />
        </Suspense>
      </div>
    </div>
  );
}
