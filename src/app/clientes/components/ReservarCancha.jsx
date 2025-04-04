"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ReservaHorarios() {
  const [tipo, setTipo] = useState("futbol");
  const [fecha, setFecha] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (fecha) localStorage.setItem("fechaReserva", fecha);
    localStorage.setItem("tipoReserva", tipo);
  }, [fecha, tipo]);

  const buscarHorarios = async () => {
    if (!fecha) return alert("Seleccioná una fecha");
    router.push("/selector");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
      style={{ backgroundImage: "url('/Assets/admin.jpg')" }}
    >
      {/* Caja del formulario */}
      <div className="max-w-md w-full bg-gray-600/50 p-6 rounded shadow-lg relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-gray-900 flex items-center justify-center rounded-full border-2 border-gray-800 hover:bg-gray-700 hover:border-gray-700 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex justify-center mb-4">
          <Image
            src="/Assets/yael.png" // Asegurate de tener esta imagen en public/Assets/
            alt="Logo Club Yael"
            width={100}
            height={100}
            className="rounded-full shadow-md border-2 border-white"
          />
        </div>

        <h2 className="text-center font-bold mb-4 text-xl text-white">
          Reservar cancha de {tipo.toUpperCase()}
        </h2>

        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={() => setTipo("futbol")}
            className={`px-4 py-2 rounded-full font-bold ${
              tipo === "futbol"
                ? "bg-gray-800 text-white"
                : "bg-gray-500 border"
            }`}
          >
            FUTBOL
          </button>
          <button
            onClick={() => setTipo("padel")}
            className={`px-4 py-2 rounded-full font-bold ${
              tipo === "padel" ? "bg-gray-800 text-white" : "bg-gray-500 border"
            }`}
          >
            PADEL
          </button>
        </div>

        <input
          type="date"
          className="w-full border p-2 rounded mb-4 text-white bg-gray-500/80"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <button
          onClick={buscarHorarios}
          className="w-full bg-[#0e122b] hover:bg-[#0e124a] text-white py-2 rounded mb-4"
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  );
}
