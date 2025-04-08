"use client";
import { useState, Suspense } from "react";
import SelectorTabs from "./components/SelectorTabs";
import EditorFutbol from "./components/EditorFutbol";
import EditorPadel from "./components/EditorPadel";
import EditorEvento from "./components/EditorEvento";
import BackButton from "../components/BackButton";

export default function Page() {
  const [selected, setSelected] = useState("eventos");

  return (
    <div className="min-h-screen bg-[#d9d9d9] flex flex-col items-center justify-center py-6 px-4">
      <div className="w-full max-w-md bg-[#1e2446] border-4 border-gray-400 rounded-2xl shadow-lg p-6">
        <div className="w-full flex justify-start mb-4">
          <BackButton />
        </div>

        <div className="mb-4 flex justify-center">
          <img
            src="/Assets/yael.png"
            alt="Club Yael Logo"
            width={100}
            height={100}
            className="w-32 h-32 rounded-full object-cover mb-8 shadow-md"
          />
        </div>

        <div className="w-full mb-4">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full p-2 rounded bg-gray-200 text-black font-semibold"
          >
            <option value="futbol">Fútbol</option>
            <option value="eventos">Eventos</option>
            <option value="padel">Padel</option>
          </select>
        </div>

        <div className="w-full">
          <Suspense
            fallback={<p className="text-white text-center">Cargando...</p>}
          >
            {selected === "futbol" && <EditorFutbol />}
            {selected === "padel" && <EditorPadel />}
            {selected === "eventos" && <EditorEvento />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
