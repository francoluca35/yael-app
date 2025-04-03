"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const HistorialSemana = dynamic(() => import("../components/HistorialSemana"), {
  ssr: false,
});

export default function historial() {
  return (
    <div className="min-h-screen p-6 bg-[#e7ebd3]">
      <Suspense fallback={<p className="text-center mt-10">Cargando historial...</p>}>
        <HistorialSemana />
      </Suspense>
    </div>
  );
}
