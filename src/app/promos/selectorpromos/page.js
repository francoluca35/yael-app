"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faTableTennisPaddleBall,
  faFaceSmileWink,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import ButtonBack from "@/app/components/ButtonBack";

export default function SelectorPromos() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-start p-4 space-y-6">
      {/* Botón Volver */}
      <div className="self-start mb-4">
        <ButtonBack />
      </div>

      <img
        src="/Assets/logo.jpeg"
        alt="Club Yael"
        className="w-40 h-40 object-contain rounded-full mt-2"
      />

      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => router.push("/torneodefutbol?tipo=futbol")}
          className="w-full flex items-center bg-[#1F3B67] p-4 rounded-md text-white transform transition-transform hover:scale-105"
        >
          <div className="bg-white text-[#1F3B67] rounded-full p-3 mr-4">
            <FontAwesomeIcon icon={faFutbol} className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-lg">Torneo de futbol</p>
            <p className="text-sm">20% Descuento - Sábados</p>
            <p className="text-sm">Lunes a Domingo</p>
          </div>
        </button>

        <button
          onClick={() => router.push("/torneodepadel?tipo=padel")}
          className="w-full flex items-center bg-[#C6C5D4] p-4 rounded-md text-[#1F3B67] transform transition-transform hover:scale-105"
        >
          <div className="bg-white text-[#1F3B67] rounded-full p-3 mr-4">
            <FontAwesomeIcon
              icon={faTableTennisPaddleBall}
              className="w-6 h-6"
            />
          </div>
          <div className="text-left">
            <p className="font-semibold text-lg">Torneo de padle</p>
            <p className="text-sm">20% Descuento - Sábados</p>
            <p className="text-sm">Lunes a Domingo</p>
          </div>
        </button>

        <button
          onClick={() => router.push("/fiestas?tipo=cumpleaños")}
          className="w-full flex items-center bg-[#1F3B67] p-4 rounded-md text-white transform transition-transform hover:scale-105"
        >
          <div className="bg-white text-[#1F3B67] rounded-full p-3 mr-4">
            <FontAwesomeIcon icon={faFaceSmileWink} className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-lg">Promo Cumpleaños</p>
            <p className="text-sm">10% Descuento - Sábados y Domingos</p>
            <p className="text-sm">Lunes a Domingo</p>
          </div>
        </button>
      </div>
    </div>
  );
}
