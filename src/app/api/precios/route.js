import clientPromise from "../../../../lib/mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("yael");
    const canchas = await db.collection("canchas").find().toArray();

    const precios = {};
    for (let cancha of canchas) {
      precios[cancha.cancha] = cancha.precio;
    }

    return new Response(JSON.stringify(precios), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en GET /api/precios:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener los precios" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request) {
  try {
    const { cancha, precio } = await request.json();
    const client = await clientPromise;
    const db = client.db("yael");

    await db.collection("canchas").updateOne(
      { cancha },
      { $set: { precio } }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en PUT /api/precios:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar el precio" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}