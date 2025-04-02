import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fecha = searchParams.get("fecha");
    const tipo = searchParams.get("tipo");

    const client = await clientPromise;
    const db = client.db("yael");
    const reservas = await db
      .collection("reserved")
      .find({ fecha, tipo })
      .toArray();

    return Response.json(reservas);
  } catch (error) {
    return Response.json({ error: "Error al traer reservas" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db("yael");

    await db.collection("reserved").updateOne(
      { _id: new ObjectId(id) },
      { $set: { pago: "total" } }
    );

    // Traer actualizadas
    const now = new Date().toISOString().slice(0, 10);
    const tipo = "futbol"; // por defecto para refrescar (podés mejorar esto)
    const reservas = await db
      .collection("reserved")
      .find({ fecha: now, tipo })
      .toArray();

    return Response.json(reservas);
  } catch (error) {
    return Response.json({ error: "Error al actualizar pago" }, { status: 500 });
  }
}
