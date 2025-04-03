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
      {
        $set: {
          estado: "pagototal",
          pago: null,
        },
      }
    );

    return Response.json({ message: "Actualizado" });
  } catch (error) {
    return Response.json({ error: "Error al actualizar estado" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db("yael");

    await db.collection("reserved").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ message: "Reserva eliminada" });
  } catch (error) {
    return Response.json({ error: "Error al eliminar reserva" }, { status: 500 });
  }
}
