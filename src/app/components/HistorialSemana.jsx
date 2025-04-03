"use client";
import { useState } from "react";
import useHistorial from "@/hooks/useHistorial";
import ExportarHistorial from "./ExportarHistorial";
import BackButton from "./BackButton";

export default function HistorialSemana() {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const { data, loading } = useHistorial(desde, hasta);

  const handleBuscar = () => {
    if (!desde || !hasta) return alert("Elegí ambas fechas");
  };

  return (
    <div className="p-4">
        
  <div className="relative mb-6 py-2 ">

    <div className="absolute left-0 top-1/2 -translate-y-1/2">
      <BackButton />
    </div>
  
    
    <h2 className="text-center text-xl font-bold text-black">HISTORIAL SEMANAL</h2>
  </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center mb-6">
        <input
          type="date"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto text-black"
        />
        <input
          type="date"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto text-black"
        />
        <button
          onClick={handleBuscar}
          className="bg-[#1e2553] hover:bg-blue-900 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Buscar
        </button>
      </div>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No hay reservas en esa semana.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 bg-white text-black">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border">Nombre</th>
                  <th className="p-2 border">Teléfono</th>
                  <th className="p-2 border">Fecha</th>
                  <th className="p-2 border">Hora</th>
                  <th className="p-2 border">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{item.nombre}</td>
                    <td className="p-2 border">{item.phone}</td>
                    <td className="p-2 border">{item.fecha}</td>
                    <td className="p-2 border">{item.hora}</td>
                    <td className="p-2 border capitalize">{item.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botones de exportación */}
          <ExportarHistorial data={data} desde={desde} hasta={hasta} />
        </>
      )}
    </div>
  );
}
