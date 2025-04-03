"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-[#005282] hover:bg-[#243583] transition"
      title="Volver"
    >
      <ArrowLeft size={20} className="text-white" />
    </button>
  );
}
