"use client";
import { useState, useEffect } from "react";
import { useEventosYael } from "@/hooks/useEventosYael";
import { useSearchParams } from "next/navigation";

export default function FormTorneoFutbol() {
  const [precioHora, setPrecioHora] = useState(0);
  const [precioOriginal, setPrecioOriginal] = useState(0);
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  const [form, setForm] = useState({
    dia: "",
    desde: "",
    hasta: "",
    equipos: "",
    nombre: "",
    precio: "",
  });

  const searchParams = useSearchParams();
  const tipoEvento = searchParams.get("tipo") || "padel";

  const { eventos, loading } = useEventosYael();

  const getDiaSemana = (fechaStr) => {
    if (!fechaStr) return "";
    const dias = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const fecha = new Date(fechaStr);
    return dias[fecha.getDay()];
  };

  const normalizarDia = (dia) => {
    switch (dia) {
      case "Lunes":
      case "Martes":
      case "Miércoles":
      case "Jueves":
        return "L a J";
      case "Viernes":
        return "Viernes";
      case "Sábado":
        return "Sabado";
      case "Domingo":
        return "Domingo";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!loading && Array.isArray(eventos)) {
      const diaSemana = getDiaSemana(form.dia);
      const clavePrecio = normalizarDia(diaSemana);

      const evento = eventos.find(
        (e) => e.evento?.toLowerCase() === tipoEvento.toLowerCase()
      );

      if (evento?.preciosPorDia?.[clavePrecio]) {
        const precio = Number(evento.preciosPorDia[clavePrecio]) || 0;
        setPrecioHora(precio);
        setPrecioOriginal(precio);
      }
    }
  }, [form.dia, eventos, tipoEvento, loading]);

  useEffect(() => {
    if (form.desde && form.hasta && precioHora && form.dia) {
      const [h1, m1] = form.desde.split(":").map(Number);
      const [h2, m2] = form.hasta.split(":").map(Number);
      const horas = h2 + m2 / 60 - (h1 + m1 / 60);
      let total = horas * precioHora;
      let descuento = false;

      const diaSemana = getDiaSemana(form.dia);
      const clavePrecio = normalizarDia(diaSemana);

      if (clavePrecio === "Sabado") {
        total *= 0.8;
        descuento = true;
      }

      setDescuentoAplicado(descuento);
      setForm((prev) => ({ ...prev, precio: total.toFixed(2) }));
    } else {
      setForm((prev) => ({ ...prev, precio: "" }));
      setDescuentoAplicado(false);
    }
  }, [form.desde, form.hasta, form.dia, precioHora]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const data = {
      ...form,
      tipo: "evento",
      evento: tipoEvento,
      hora: `${form.desde} - ${form.hasta}`,
      pago: form.precio,
      descuento: descuentoAplicado,
      precioOriginal: precioOriginal,
    };

    fetch("/api/reserved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        alert("Reserva realizada con éxito");
      } else {
        alert("Error al guardar la reserva");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e0d8] to-[#d0d0f0] px-4">
      <div className="w-full max-w-md space-y-6 p-6 bg-white shadow-xl rounded-2xl">
        <div className="bg-[#2f3f6b] text-white p-4 rounded-xl flex items-center space-x-4">
          <div className="bg-white text-[#2f3f6b] rounded-full p-3 text-xl">
            ⚽
          </div>
          <div className="text-left">
            <p className="font-semibold text-lg">Torneo de {tipoEvento}</p>
            <p className="text-sm">20% Descuento - Sábados</p>
            <p className="text-sm">Viernes, Sábado, Domingo</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "DÍA DEL TORNEO", name: "dia", type: "date" },
            { label: "DESDE", name: "desde", type: "time" },
            { label: "HASTA", name: "hasta", type: "time" },
            { label: "CANTIDAD DE EQUIPOS", name: "equipos", type: "number" },
            { label: "NOMBRE DEL TORNEO", name: "nombre", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e4b9c] transition"
                min={
                  type === "date"
                    ? new Date().toISOString().split("T")[0]
                    : undefined
                }
              />
            </div>
          ))}

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              PRECIO TOTAL
            </label>
            <div className="bg-[#2f3f6b] text-white w-full p-3 rounded-lg text-lg font-semibold">
              {form.precio
                ? `$${Number(form.precio).toLocaleString("es-AR")}`
                : "$0.00"}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Precio por hora: ${precioOriginal.toLocaleString("es-AR")}
          </div>

          {descuentoAplicado && (
            <div className="text-green-600 font-medium text-sm mt-1">
              🎉 Se aplicó un 20% de descuento por ser sábado
            </div>
          )}

          <p className="text-xs text-gray-500">
            El precio se calcula automáticamente según el día y horario.
          </p>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-full bg-[#5e4b9c] text-white font-semibold hover:bg-[#4a3b86] transition-all"
          >
            IR A PAGAR
          </button>
        </div>
      </div>
    </div>
  );
}
