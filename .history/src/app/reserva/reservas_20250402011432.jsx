"use client";
import { useEffect, useState } from "react";

const HORARIOS = Array.from({ length: 14 }, (_, i) => `${10 + i}:00`);

export default function Reservas() {
  const [tipo, setTipo] = useState("futbol");
  const [reservas, setReservas] = useState([]);
  const fechaHoy = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchReservas = async () => {
      const res = await fetch(`/api/reservas?fecha=${fechaHoy}&tipo=${tipo}`);
      const data = await res.json();
      setReservas(data);
    };
    fetchReservas();
  }, [tipo]);

  const getReserva = (hora) => reservas.find((r) => r.hora === hora);

  const confirmarPagoTotal = async (id) => {
    const res = await fetch(`/api/reservas`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      // volver a cargar reservas
      const data = await res.json();
      setReservas(data);
    }
  };

  return (
    <div className="min-h-screen bg-[#e7ebd3] p-4">
      <h2 className="text-center text-xl font-bold mb-4">RESERVAS</h2>

      {/* Botones tipo */}
      <div className="flex justify-center mb-6 gap-2">
        <button
          onClick={() => setTipo("futbol")}
          className={`px-4 py-2 rounded-l-xl font-bold ${
            tipo === "futbol" ? "bg-[#9b1978] text-white" : "bg-gray-300"
          }`}
        >
          FUTBOL
        </button>
        <button
          onClick={() => setTipo("padel")}
          className={`px-4 py-2 rounded-r-xl font-bold ${
            tipo === "padel" ? "bg-[#6b5cc4] text-white" : "bg-gray-300"
          }`}
        >
          PADEL
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-400 text-white">
          <thead className="bg-[#6b5cc4] text-sm">
            <tr>
              <th className="p-2 border">NOMBRE</th>
              <th className="p-2 border">HORARIO</th>
              <th className="p-2 border">P/R</th>
              <th className="p-2 border">CONFIRMACIÓN</th>
            </tr>
          </thead>
          <tbody>
            {HORARIOS.map((hora) => {
              const reserva = getReserva(hora);
              return (
                <tr key={hora} className="bg-[#7c76a5] text-center">
                  <td className="border p-2">{reserva?.nombre || ""}</td>
                  <td className="border p-2">{hora}</td>
                  <td className="border p-2">
                    {reserva?.pago === "total" && (
                      <div className="bg-green-400 text-white font-bold rounded py-1">PAGO</div>
                    )}
                    {reserva?.pago !== "total" && reserva?.pago && (
                      <div className="bg-yellow-300 text-black font-bold rounded p-1">
                        ${reserva.pago}
                        <button
                          onClick={() => confirmarPagoTotal(reserva._id)}
                          className="mt-1 text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 block w-full"
                        >
                          Pago total
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="border p-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto" />
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
