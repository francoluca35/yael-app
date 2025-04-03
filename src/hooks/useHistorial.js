"use client";
import { useState, useEffect } from "react";

export default function useHistorial(desde, hasta) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!desde || !hasta) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/historial?desde=${desde}&hasta=${hasta}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [desde, hasta]);

  return { data, loading };
}
