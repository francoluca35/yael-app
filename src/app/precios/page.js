"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import usePrecios from "@/hooks/usePrecios";
import PrecioForm from "../components/PrecioForm";

export default function PreciosPage() {
  const { precios, loading, actualizarPrecio } = usePrecios();

  if (loading) {
    return <div className="text-center mt-10 text-lg">Cargando precios...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-200 p-6 flex flex-col items-center gap-10">
      <h2 className="text-2xl font-bold">PRECIOS</h2>

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