"use client";
import { useRouter } from "next/navigation";
import { CalendarCheck, LogIn } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const buttons = [
    {
      label: "Reservar cancha",
      route: "/clientes/alquiler",
      icon: <CalendarCheck size={32} />,
    },
    {
      label: "Administrador",
      route: "/Login",
      icon: <LogIn size={32} />,
    },
  ];

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/Assets/reserva.jpg')" }} 
    >
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-white">
        <h1 className="text-4xl font-bold text-center drop-shadow-lg uppercase">
          Hace tu reserva en club yael
        </h1>

        <div className="grid gap-6 md:grid-cols-2 sm:grid-cols-1">
          {buttons.map((btn) => (
            <button
              key={btn.route}
              onClick={() => router.push(btn.route)}
              className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-[#0e122b]  text-white rounded-lg shadow-lg hover:bg-gray-900 transition"
            >
              {btn.icon}
              <span className="text-lg font-semibold">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
