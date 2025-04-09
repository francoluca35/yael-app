import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "yael";

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("eventos");

    const eventos = await collection.find().toArray();

    return NextResponse.json(eventos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener eventos" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
export async function getEventos() {
  try {
    const res = await fetch("/api/eventos"); // llamada al API route
    if (!res.ok) {
      throw new Error("Error al obtener eventos");
    }
    return await res.json();
  } catch (error) {
    console.error("Error en getEventos:", error);
    return [];
  }
}

export async function POST(request) {
  try {
    const { evento, dia, precioDia, precioConBuffet } = await request.json();

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("eventos");

    await collection.updateOne(
      { evento },
      {
        $set: {
          [`preciosPorDia.${dia}`]: precioDia,
          precioconbuffet: precioConBuffet,
        },
      }
    );

    return NextResponse.json({ message: "Precios actualizados" });
  } catch (error) {
    console.error("Error al actualizar precios:", error);
    return NextResponse.json(
      { error: "Error al actualizar precios" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
