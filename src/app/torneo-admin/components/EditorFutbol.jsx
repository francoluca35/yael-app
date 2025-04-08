"use client";
import { useEffect, useState } from "react";
import DaySelector from "./DaySelector";
import useEventos from "@/hooks/useEventos";
import useGuardarPrecios from "@/hooks/useGuardarPrecios";

export default function EditorFutbol() {
  const [selectedDays, setSelectedDays] = useState(["L a J"]);
  const { eventos, loading } = useEventos();
  const [precioDia, setPrecioDia] = useState("");
  const [precioConBuffet, setPrecioConBuffet] = useState("");
  const { guardarPrecios, guardando, mensaje } = useGuardarPrecios();

  useEffect(() => {
    if (!loading) {
      const futbolData = eventos.find((e) => e.evento === "futbol");
      if (futbolData) {
        const selected = selectedDays[0];
        setPrecioDia(futbolData.preciosPorDia[selected] || "");
        setPrecioConBuffet(futbolData.precioconbuffet || "");
      }
    }
  }, [loading, eventos, selectedDays]);

  const handleGuardar = () => {
    guardarPrecios({
      evento: "futbol",
      dia: selectedDays[0],
      precioDia,
      precioConBuffet,
    });
  };

  return (
    <div className="bg-[#1e2446] p-4">
      <div className="bg-gray-400 p-4 text-center font-bold text-sm text-white uppercase">
        Selector de día
      </div>

      <DaySelector
        selectedDay={selectedDays[0]}
        setSelectedDay={(day) => setSelectedDays([day])}
      />

      <div className="bg-gray-600 text-center py-2 text-white font-bold mt-4">
        Precio por hora:
      </div>
      <input
        value={precioDia}
        onChange={(e) => setPrecioDia(e.target.value)}
        className="text-center font-bold text-black p-3 w-full"
      />

      <div className="bg-gray-600 text-center py-2 text-white font-bold mt-4">
        Con Buffet
      </div>
      <input
        value={precioConBuffet}
        onChange={(e) => setPrecioConBuffet(e.target.value)}
        className="text-center font-bold text-black p-3 w-full"
      />

      <div className="bg-transparent p-4 mt-4">
        <button
          onClick={handleGuardar}
          className="bg-[#6468b1] text-white font-bold py-2 px-6 w-full rounded-full"
          disabled={guardando}
        >
          {guardando ? "Guardando..." : "GUARDAR"}
        </button>

        {mensaje && (
          <div className="mt-2 text-center font-bold text-white">{mensaje}</div>
        )}
      </div>
    </div>
  );
}
