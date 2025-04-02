"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck, DollarSign, CheckCircle, Gift } from "lucide-react"; // Íconos

export default function Home() {
  const router = useRouter();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const fecha = now.toLocaleDateString("es-AR");
    const hora = now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    setDateTime(`${fecha} ${hora}`);
  }, []);

  const buttons = [
    { label: "Reserva", route: "/reserva", icon: <CalendarCheck size={32} /> },
    { label: "Precios", route: "/precios", icon: <DollarSign size={32} /> },
    { label: "Check", route: "/check", icon: <CheckCircle size={32} /> },
    { label: "Promos", route: "/promos", icon: <Gift size={32} /> },
  ];

  return (
    <div className="min-h-screen bg-[#e7ebd3] flex flex-col items-center justify-start p-4">
      {/* Top bar */}
      <div className="w-full flex justify-between items-center mb-6">
        <span className="font-semibold text-black">{dateTime}</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">club yael (admin)</span>
          <span className="w-5 h-5 bg-red-600 rounded-full" />
        </div>
      </div>

      {/* Logo */}
      <img src="/Assets/yael.png" alt="Club Yael Logo" className="w-48 h-28 object-contain mb-8" />

      {/* Botones */}
      <div className="grid grid-cols-2 gap-6">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => router.push(btn.route)}
            className="w-28 h-28 rounded-xl bg-[#6b5cc4] text-white font-semibold shadow-lg hover:scale-105 transition flex flex-col items-center justify-center gap-2"
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
