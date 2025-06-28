"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function ReservaSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    const data = JSON.parse(localStorage.getItem("formReservaEvento") || "{}");

    if (success === "true" && data) {
      fetch("/api/reserved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          id: uuidv4(),
        }),
      }).then((res) => {
        if (res.ok) {
          alert("¡Reserva confirmada!");
          localStorage.removeItem("formReservaEvento");
          router.replace("/");
        } else {
          alert("Error al guardar reserva");
        }
      });
    }
  }, [searchParams]);

  return <div>Procesando reserva...</div>;
}
