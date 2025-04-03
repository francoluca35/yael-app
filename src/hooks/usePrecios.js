"use client";
import { useEffect, useState } from "react";

export default function usePrecios() {
  const [precios, setPrecios] = useState({ futbol: "", padel: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrecios();
  }, []);

const fetchPrecios = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/precios");
    const data = await res.json();
    setPrecios({
      futbol: data.futbol,
      padel: data.padel,
    });
  } catch (error) {
    console.error("Error cargando precios:", error);
  } finally {
    setLoading(false);
  }
};

  const actualizarPrecio = async (tipo, nuevoPrecio) => {
    await fetch("/api/precios", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cancha: tipo, precio: nuevoPrecio }),
    });
    fetchPrecios();
  };

  return {
    precios,
    loading,
    actualizarPrecio,
  };
}
