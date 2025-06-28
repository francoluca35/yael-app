"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

export default function FormReserved() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [tipo, setTipo] = useState("");
  const [precio, setPrecio] = useState({ precio: "", sena: "" });
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    formaPago: "",
    tipoPago: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setFecha(localStorage.getItem("fechaReserva") || "");
    setHora(localStorage.getItem("horarioReserva") || "");
    const tipoStorage = localStorage.getItem("tipoReserva") || "futbol";
    setTipo(tipoStorage);

    fetch(`/api/canchas?tipo=${tipoStorage}`)
      .then((res) => res.json())
      .then((data) => setPrecio({ precio: data.precio, sena: data.sena }));
  }, []);

  useEffect(() => {
    const success = searchParams.get("success");
    const tipoPago = searchParams.get("tipoPago");
    const formData = JSON.parse(localStorage.getItem("formReserva") || "{}");

    if (
      success === "true" &&
      precio.precio !== "" &&
      precio.sena !== "" &&
      tipoPago
    ) {
      const pagoFinal = tipoPago === "total" ? null : precio[tipoPago];
      const estado = tipoPago === "total" ? "pagototal" : "se\u00f1a";
      const mp = localStorage.getItem("mpToken") || "mp";

      fetch("/api/reserved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uuidv4(),
          fecha: formData.fecha,
          hora: formData.hora,
          tipo: formData.tipo,
          nombre: formData.nombre,
          phone: formData.phone,
          pago: pagoFinal,
          estado,
          mp,
        }),
      }).then(() => {
        alert("¡Reserva confirmada!");
        localStorage.removeItem("formReserva");
        router.replace("/");
      });
    }
  }, [searchParams, precio]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.telefono || !form.formaPago || !form.tipoPago) {
      return alert("Completá todos los campos");
    }

    const formData = {
      nombre: form.nombre,
      phone: form.telefono,
      fecha,
      hora,
      tipo,
    };

    localStorage.setItem("formReserva", JSON.stringify(formData));

    // Si elige efectivo
    if (form.formaPago === "efectivo") {
      const id = uuidv4();
      const estado = "efectivo";
      const pago = form.tipoPago === "total" ? precio.precio : precio.sena;

      await fetch("/api/reserved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          ...formData,
          pago,
          estado,
          mp: "efectivo",
        }),
      });

      // Mensaje personalizado para WhatsApp
      const mensaje = `Hola soy ${form.nombre}, reservé cancha de ${tipo}, a las ${hora}, el ${fecha}. Llevo la seña en persona`;
      const telefonoWhatsApp = "549XXXXXXXXXX"; // ← tu número de WhatsApp con código país sin +
      const url = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(
        mensaje
      )}`;

      Swal.fire({
        title: "Reserva confirmada",
        text: "Ahora te llevamos a WhatsApp para avisar al local",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = url;
      }, 2000);

      return;
    }

    // Si elige Mercado Pago
    localStorage.setItem("mpToken", form.formaPago);

    const res = await fetch("/api/mercadopago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Reserva ${tipo}`,
        price: form.tipoPago === "total" ? precio.precio : precio.sena,
        tipoPago: form.tipoPago,
      }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const monto = form.tipoPago === "total" ? precio.precio : precio.sena;

  return (
    <div className="min-h-screen bg-[#0e122b] flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg relative">
        {/* Botón volver */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full border-2 bg-gray-900 hover:bg-gray-700 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex justify-center mb-6">
          <Image
            src="/Assets/logo.jpeg"
            alt="logo"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-300 shadow"
          />
        </div>

        <h2 className="text-center text-gray-700 font-bold text-xl mb-4">
          Formulario de Reserva
        </h2>

        <p className="mb-4 text-center bg-blue-100 text-blue-900 p-2 rounded font-medium">
          Fecha: {fecha} - Hora: {hora}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="relative">
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre completo"
              required
              className="w-full bg-transparent border-b border-gray-400 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-900 pr-6 py-2"
            />
          </div>

          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            required
            className="w-full bg-transparent border-b border-gray-400 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-900 pr-6 py-2"
          />

          <div className="relative">
            <select
              name="formaPago"
              value={form.formaPago}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-400 focus:text-gray-600 text-gray-900 focus:outline-none focus:border-blue-900 py-2 pr-8 appearance-none"
            >
              <option className="" value="">
                Forma de pago
              </option>
              <option className="" value="mercado_pago">
                Mercado Pago
              </option>
              <option value="efectivo">Efectivo</option>
            </select>
            {/* Flecha hacia abajo */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              ▼
            </span>
          </div>

          <div className="relative">
            <select
              name="tipoPago"
              value={form.tipoPago}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-gray-400 focus:text-gray-600 text-gray-900 focus:outline-none focus:border-blue-900 py-2 pr-8 appearance-none"
            >
              <option value="">Tipo de pago</option>
              <option value="total">Pagar total</option>
              <option value="sena">Pagar seña</option>
            </select>
            {/* Flecha hacia abajo */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              ▼
            </span>
          </div>

          {form.tipoPago && (
            <div className="bg-gray-800 text-white p-3 rounded text-center font-semibold">
              Precio a pagar: ${monto}
            </div>
          )}

          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold p-3 rounded-md transition-all duration-300"
          >
            Siguiente
          </button>
        </form>
      </div>
    </div>
  );
}
