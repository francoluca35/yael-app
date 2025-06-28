"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck, DollarSign, Library, Gift, Power } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const fecha = now.toLocaleDateString("es-AR");
    const hora = now.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDateTime(`${fecha} ${hora}`);
  }, []);

  const buttons = [
    { label: "Reserva", route: "/reserva", icon: <CalendarCheck size={32} /> },
    { label: "Precios", route: "/precios", icon: <DollarSign size={32} /> },
    { label: "Historial", route: "/historial", icon: <Library size={32} /> },
    { label: "Promos", route: "/torneo-admin", icon: <Gift size={32} /> },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start p-4"
      style={{ backgroundImage: "url('/Assets/admin.jpg')" }}
    >
      <div className="w-full flex justify-between items-center mb-6 bg-white/80 p-2 rounded shadow">
        <span className="font-semibold text-black">{dateTime}</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">Club Caruso (admin)</span>
          <button
            onClick={() => {
              localStorage.removeItem("adminUser");
              router.push("/");
            }}
            className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition"
            title="Cerrar sesión"
          >
            <Power size={16} className="text-white" />
          </button>
        </div>
      </div>

      <img
        src="/Assets/logo.jpeg"
        alt="Club Caruso"
        className="w-32 h-32 rounded-full object-cover mb-8 shadow-md"
      />

      <div className="grid grid-cols-2 gap-6 bg-transparent p-4 rounded-lg ">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => router.push(btn.route)}
            className="w-28 h-28 rounded-xl bg-[#0e122b] text-white font-semibold shadow-lg hover:scale-105 transition flex flex-col items-center justify-center gap-2"
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
