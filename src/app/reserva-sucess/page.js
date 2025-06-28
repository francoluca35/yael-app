"use client";
import { Suspense } from "react";
import ReservaSuccessContent from "./components/ReservaSuccessContent";

export default function ReservaSuccessPage() {
  return (
    <div className="text-white p-8">
      <Suspense fallback={<div className="text-white p-4">Cargando...</div>}>
        <ReservaSuccessContent />
      </Suspense>
    </div>
  );
}
