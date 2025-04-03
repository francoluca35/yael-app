"use client";
import { useState } from "react";

export default function PrecioForm({ tipo, precioActual, onActualizar }) {
  const [nuevoPrecio, setNuevoPrecio] = useState("");

  const handleSubmit = () => {
    if (nuevoPrecio) {
      onActualizar(tipo, nuevoPrecio);
      setNuevoPrecio("");
    }
  };

  return (
    <div className="bg-black text-white p-4 w-full max-w-xs rounded-lg shadow">
      <h3 className="text-center text-xl font-bold mb-2">{tipo.toUpperCase()}</h3>
      <p className="mb-2 font-bold">Precio actual: ${precioActual || "..."}</p>
      <label className="text-sm font-bold block mb-1">PRECIO:</label>
      <input
        type="number"
        value={nuevoPrecio}
        onChange={(e) => setNuevoPrecio(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-500 text-white"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-gray-700 transition"
      >
        CAMBIAR PRECIO
      </button>
    </div>
  );
}
