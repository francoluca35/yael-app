"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function PrecioForm({ tipo, precioActual, onActualizar }) {
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [barraClase, setBarraClase] = useState("w-0");

  const handleSubmit = async () => {
    if (!nuevoPrecio || enviando) return;

    setEnviando(true);
    setExito(false);
    setBarraClase("w-0");


    setTimeout(() => {
      setBarraClase("w-full bg-gradient-to-r from-green-500 to-green-800");
    }, 100);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      await onActualizar(tipo, nuevoPrecio);

      setNuevoPrecio("");
      setBarraClase("w-full bg-gradient-to-r from-green-400 to-emerald-500");
      setExito(true);


      setTimeout(() => {
        setExito(false);
        setBarraClase("w-0");
      }, 2500); 
    } catch (err) {
      console.error("Error al guardar precio:", err);
      setEnviando(false);
    } finally {

      setTimeout(() => {
        setEnviando(false);
      }, 500);
    }
  };

  return (
    <div className="bg-[#0e122b] text-white p-6 w-full max-w-md rounded-lg shadow-lg">
      <h3 className="text-center text-lg font-semibold text-white mb-4 tracking-wider">
        {tipo.toUpperCase()}
      </h3>
      <p className="text-center text-sm text-gray-300 mb-4 font-light">
        Precio actual: ${precioActual || "..."}
      </p>

      <div className="relative group">
        <input
          type="number"
          value={nuevoPrecio}
          onChange={(e) => setNuevoPrecio(e.target.value)}
          placeholder="Nuevo precio"
          disabled={enviando}
          className="w-full bg-transparent px-4 py-3 pr-10 border-b-2 border-gray-500 placeholder-gray-400 text-white outline-none transition-all"
        />

        <div
          onClick={handleSubmit}
          className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer transition ${
            enviando ? "text-gray-500 pointer-events-none" : "text-white hover:text-[#505adf]"
          }`}
        >
          {exito ? <CheckCircle size={20} className="text-green-400" /> : <ArrowRight size={20} />}
        </div>


        <div
          className={`absolute left-0 bottom-0 h-[2px] transition-all duration-1000 ${barraClase}`}
        />
      </div>



    </div>
  );
}
