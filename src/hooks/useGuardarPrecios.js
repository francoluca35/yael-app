import { useState } from "react";

export default function useGuardarPrecios() {
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const guardarPrecios = async ({
    evento,
    dia,
    precioDia,
    precioConBuffet,
  }) => {
    setGuardando(true);
    setMensaje("");
    try {
      const res = await fetch("/api/eventos", {
        method: "POST",
        body: JSON.stringify({ evento, dia, precioDia, precioConBuffet }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");
      setMensaje("Precios actualizados con éxito");
    } catch (err) {
      setMensaje("Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  return { guardarPrecios, guardando, mensaje };
}
