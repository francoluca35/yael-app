import { useEffect, useState } from "react";

export const useEventosYael = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/eventos")
      .then((res) => res.json())
      .then((data) => {
        setEventos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando eventos:", err);
        setLoading(false);
      });
  }, []);

  return { eventos, loading };
};
