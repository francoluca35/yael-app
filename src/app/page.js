"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { CalendarCheck, LogIn } from "lucide-react";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

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
    {
      label: "Fiestas/Torneos",
      route: "/promos",
      icon: <FontAwesomeIcon icon={faFutbol} size="2x" />,
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
      <div className="relative z-10 flex flex-col items-center gap-8 text-white w-full max-w-screen-md">
        {" "}
        {/* Añadimos un ancho máximo al contenedor */}
        <h1 className="text-4xl font-bold text-center drop-shadow-lg uppercase">
          Hace tu reserva en club yael
        </h1>
        <div className="flex gap-6 w-full md:flex-row sm:flex-col">
          {" "}
          {/* Contenedor flex para los dos primeros botones */}
          {buttons.slice(0, 2).map((btn) => (
            <button
              key={btn.route}
              onClick={() => router.push(btn.route)}
              className="flex-1 flex flex-col items-center justify-center gap-2 px-6 py-4 bg-[#0e122b] text-white rounded-lg shadow-lg hover:bg-gray-900 transition"
            >
              {btn.icon}
              <span className="text-lg font-semibold">{btn.label}</span>
            </button>
          ))}
        </div>
        {/* Tercer botón a lo ancho */}
        <button
          key={buttons[2].route}
          onClick={() => router.push(buttons[2].route)}
          className="flex flex-col items-center justify-center gap-2 px-6 py-4 bg-[#0e122b] text-white rounded-lg shadow-lg hover:bg-gray-900 transition w-full"
        >
          {buttons[2].icon}
          <span className="text-lg font-semibold">{buttons[2].label}</span>
        </button>
      </div>
    </main>
  );
}
