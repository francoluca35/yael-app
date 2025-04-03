import { useEffect, useState } from "react";

const useReservas = (tipo, fecha) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (tipo && fecha) fetchReservas();
  }, [tipo, fecha]);

  const fetchReservas = async () => {
    try {
      const res = await fetch(`/api/reservas?fecha=${fecha}&tipo=${tipo}`);
      const data = await res.json();
      setReservas(data);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    }
  };

  const marcarPagoTotal = async (id) => {
    try {
      await fetch(`/api/reservas`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchReservas();
    } catch (error) {
      console.error("Error al marcar pago total:", error);
    }
  };

  return {
    reservas,
    fetchReservas,
    marcarPagoTotal,
  };
};

export default useReservas;
