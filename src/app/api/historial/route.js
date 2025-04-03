import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const desde = searchParams.get("desde");
    const hasta = searchParams.get("hasta");

    if (!desde || !hasta) {
      return Response.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("yael");

    const datos = await db.collection("reserved").find({
      fecha: { $gte: desde, $lte: hasta },
    }).toArray();

    return Response.json(datos);
  } catch (error) {
    return Response.json({ error: "Error al obtener historial" }, { status: 500 });
  }
}
