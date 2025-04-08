"use client";
import React from "react";

export default function SelectorTabs({ selected, setSelected }) {
  const tabs = ["futbol", "eventos", "padel"];

  return (
    <div className="flex bg-gray-400 text-white font-bold">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelected(tab)}
          className={`flex-1 p-3 ${
            selected === tab ? "bg-black" : "bg-gray-500"
          }`}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
