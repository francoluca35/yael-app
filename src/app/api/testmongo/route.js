import clientPromise from "../../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("yael");
    const list = await db.listCollections().toArray();

    return new Response(JSON.stringify({ success: true, collections: list }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error test mongo:", err);
    return new Response(JSON.stringify({ error: "Conexión fallida" }), {
      status: 500,
    });
  }
}
