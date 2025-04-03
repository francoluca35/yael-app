"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useLogin from "../../hooks/useLogin.js";

export default function AdminAuth() {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (loading) return;

    const validUser = await login(username, password);

    if (validUser) {
      localStorage.setItem("adminUser", JSON.stringify(validUser));
      router.push("/home");
    } else {
      setAuthError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/Assets/admin.jpg')" }} 
    >
      <div className="bg-[#0e122b]/60 p-8 rounded-xl w-80 flex flex-col items-center shadow-lg backdrop-blur-sm">
        <img src="/Assets/yael.png" alt="Rapiflex Logo" className="w-32 mb-4 rounded-full object-cover" /> {/* Reemplazá con tu logo */}
        <h2 className="text-xl font-bold text-white mb-6">Iniciar Sesion</h2>

        {(authError || error) && (
          <p className="text-red-600 text-sm mb-2 text-center">{authError || error}</p>
        )}

        <form onSubmit={handleAuth} className="w-full flex flex-col gap-4">
          <div>
            <label className="text-white text-sm">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-white text-black outline-none"
              required
            />
          </div>

          <div>
            <label className="text-white text-sm">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-white text-black outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#273174] text-white py-2 rounded hover:bg-[#3d478a] transition"
            disabled={loading}
          >
            {loading ? "Cargando..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}