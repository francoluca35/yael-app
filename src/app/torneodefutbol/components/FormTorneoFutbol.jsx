"use client";
import { useState } from "react";

export default function FormTorneoFutbol() {
  const [form, setForm] = useState({
    dia: "",
    desde: "",
    hasta: "",
    equipos: "",
    nombre: "",
    precio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#e0e0d8] w-full max-w-md space-y-4 text-center">
      {/* Card superior */}
      <div className="bg-[#2f3f6b] text-white p-4 rounded-sm flex items-center space-x-4">
        <div className="bg-white text-[#2f3f6b] rounded-full p-3">⚽</div>
        <div className="text-left">
          <p className="font-semibold text-md">Torneo de futbol</p>
          <p className="text-sm">20% Descuento - Sábados</p>
          <p className="text-sm">Viernes, Sábado, Domingo</p>
        </div>
      </div>

      <label className="block">DIA DEL TORNEO</label>
      <input
        type="text"
        name="dia"
        value={form.dia}
        onChange={handleChange}
        className="w-full p-2 bg-black text-white rounded-sm"
      />

      <label className="block">HORARIO</label>
      <div className="flex gap-1">
        <input
          type="text"
          name="desde"
          value={form.desde}
          onChange={handleChange}
          placeholder="DESDE"
          className="w-1/2 p-2 bg-gray-700 text-white rounded-sm"
        />
        <input
          type="text"
          name="hasta"
          value={form.hasta}
          onChange={handleChange}
          placeholder="HASTA"
          className="w-1/2 p-2 bg-black text-white rounded-sm"
        />
      </div>

      <label className="block">CANTIDAD DE EQUIPOS</label>
      <input
        type="number"
        name="equipos"
        value={form.equipos}
        onChange={handleChange}
        className="w-full p-2 bg-black text-white rounded-sm"
      />

      <label className="block">NOMBRE DEL TORNEO</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        className="w-full p-2 bg-black text-white rounded-sm"
      />

      <label className="block">PRECIO TOTAL</label>
      <div className="bg-[#2f3f6b] text-white w-full p-2 rounded-sm">
        {form.precio || "$0.00"}
      </div>

      <p className="text-xs text-gray-700">
        El precio se calcula solo con el día y cantidad de horas a realizarse.
      </p>

      <button className="bg-[#5e4b9c] w-full text-white p-2 rounded-full hover:bg-[#4a3b86] transition-colors">
        IR A PAGAR
      </button>
    </div>
  );
}
