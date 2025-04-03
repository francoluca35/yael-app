"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import usePrecios from "@/hooks/usePrecios";
import PrecioForm from "../components/PrecioForm";
import BackButton from "../components/BackButton";

export default function PreciosPage() {
  const { precios, loading, actualizarPrecio } = usePrecios();

  if (loading) {
    return <div className="text-center mt-10 text-lg">Cargando precios...</div>;
  }

  return (
    <div className="min-h-screen bg-[#e7ebd3] p-6 flex flex-col items-center gap-10">
<div className="relative w-full flex items-center justify-center mb-6 py-2">

  <div className="absolute left-0">
    <BackButton />
  </div>

  <h2 className="text-xl font-bold text-black uppercase text-center">
    Actualización de precios
  </h2>
</div>

      <Suspense fallback={<div className="text-center">Cargando...</div>}>
        <PrecioForm
          tipo="futbol"
          precioActual={precios.futbol}
          onActualizar={actualizarPrecio}
        />
      </Suspense>

      <Suspense fallback={<div className="text-center">Cargando...</div>}>
        <PrecioForm
          tipo="padel"
          precioActual={precios.padel}
          onActualizar={actualizarPrecio}
        />
      </Suspense>
    </div>
  );
}