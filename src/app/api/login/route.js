import clientPromise from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    const { username, password } = await req.json(); // ← nombre correcto

    const client = await clientPromise;
    const db = client.db("yael");

    const user = await db.collection("users").findOne({ username });

    if (!user || user.password !== password) {
      return new Response(
        JSON.stringify({ error: "Usuario o contraseña incorrectos" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        username: user.username,
        role: user.role,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error en login:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
