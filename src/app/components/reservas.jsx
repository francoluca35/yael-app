"use client";
import { useState } from "react";
import useReservas from "@/hooks/useReservas";
import BackButton from "./BackButton";

const HORARIOS = Array.from({ length: 14 }, (_, i) => `${10 + i}:00`);
const hoy = new Date().toISOString().slice(0, 10);

export default function Reservas() {
  const [tipo, setTipo] = useState("futbol");
  const [fecha, setFecha] = useState(hoy);

  const { reservas, marcarPagoTotal } = useReservas(tipo, fecha);
  const horaActual = new Date().getHours();

  const getReserva = (hora) => reservas.find((r) => r.hora === hora);

  const esHoraPasada = (hora) => {
    const horaNum = parseInt(hora.split(":")[0]);
    const esHoy = fecha === hoy;
    return esHoy && horaNum < horaActual;
  };

  return (
    <div className="min-h-screen bg-[#e7ebd3] p-4">
<div className="relative mb-6 py-2">

  <div className="absolute left-0 top-1/2 -translate-y-1/2">
    <BackButton />
  </div>


  <h2 className="text-center text-xl font-bold text-black">RESERVAS</h2>
</div>

      <div className="flex flex-col md:flex-row justify-center mb-6 gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setTipo("futbol")}
            className={`px-4 py-2 rounded-l-xl font-bold ${
              tipo === "futbol" ? "bg-[#5c6cc4] text-white" : "bg-gray-300 text-black"
            }`}
          >
            FUTBOL
          </button>
          <button
            onClick={() => setTipo("padel")}
            className={`px-4 py-2 rounded-r-xl font-bold ${
              tipo === "padel" ? "bg-[#5c6cc4] text-white" : "bg-gray-300 text-black"
            }`}
          >
            PADEL
          </button>
        </div>

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border px-4 py-2 rounded text-black"
          max="9999-12-31"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-400 text-white">
          <thead className="bg-[#0e122b] text-sm">
            <tr>
              <th className="p-2 border">NOMBRE</th>
              <th className="p-2 border">HORARIO</th>
              <th className="p-2 border">RESERVADO</th>
              <th className="p-2 border">PAGO</th>
            </tr>
          </thead>
          <tbody>
            {HORARIOS.map((hora) => {
              const reserva = getReserva(hora);
              const terminada = esHoraPasada(hora) && reserva;

              return (
                <tr key={hora} className="bg-[#212a63] text-center">
                  <td className="border p-2">{reserva?.nombre || ""}</td>
                  <td className="border p-2">{hora}</td>

                  {/* RESERVADO / TERMINADO */}
                  <td className="border p-2">
                    {terminada ? (
                      <span className="bg-gray-400 px-2 py-1 rounded text-white text-xs">
                        TERMINADO
                      </span>
                    ) : reserva ? (
                      <span className="bg-blue-500 px-2 py-1 rounded text-white text-xs">
                        RESERVADO
                      </span>
                    ) : (
                      ""
                    )}
                  </td>

                  {/* PAGO */}
                  <td className="border p-2">
                    {reserva?.estado === "pagototal" && (
                      <div className="bg-green-400 text-white font-bold rounded py-1">
                        PAGO
                      </div>
                    )}
                    {reserva?.estado === "seña" && (
                      <div className="bg-yellow-300 text-black font-bold rounded p-1">
                        ${reserva.pago}
                        <button
                          onClick={() => marcarPagoTotal(reserva._id)}
                          className="mt-1 text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 block w-full"
                        >
                          Pago total
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

