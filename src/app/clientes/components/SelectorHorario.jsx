"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const HORAS = Array.from({ length: 14 }, (_, i) => `${i + 10}:00`);

export default function SelectorHorario() {
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fechaStorage = localStorage.getItem("fechaReserva");
    const tipoStorage = localStorage.getItem("tipoReserva") || "futbol";
    setFecha(fechaStorage);
    setTipo(tipoStorage);
    fetch(`/api/horarios?fecha=${fechaStorage}&tipo=${tipoStorage}`)
      .then((res) => res.json())
      .then((data) => setHorariosOcupados(data));
  }, []);

  const handleSeleccion = (hora) => {
    if (horariosOcupados.includes(hora)) return alert("Horario ocupado");
    setHorarioSeleccionado(hora);
    localStorage.setItem("horarioReserva", hora);
  };

  const handleSiguiente = () => {
    if (!horarioSeleccionado) return alert("Elegí un horario");
    router.push("/formreserved");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0e122b] px-4 py-8">
      <div className="bg-gray-300 rounded-xl shadow-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-gray-900 flex items-center justify-center rounded-full border-2 hover:bg-gray-700 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex justify-center mb-6">
          <Image
            src="/Assets/logo.jpeg"
            alt="Yael"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-300 shadow"
          />
        </div>

        <h2 className="text-center text-gray-700 font-bold text-xl mb-4">
          Seleccionar horario
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {HORAS.map((hora) => {
            const isOcupado = horariosOcupados.includes(hora);
            const isSeleccionado = horarioSeleccionado === hora;

            return (
              <button
                key={hora}
                onClick={() => handleSeleccion(hora)}
                className={`p-2 rounded text-sm sm:text-base transition-all duration-300
                  ${
                    isOcupado
                      ? "bg-red-400 cursor-not-allowed text-white"
                      : isSeleccionado
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                disabled={isOcupado}
              >
                {hora}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSiguiente}
          className="bg-black text-white w-full p-3 rounded mt-6 text-lg hover:bg-gray-800 transition-all duration-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
