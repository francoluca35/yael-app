// lib/db.js
import clientPromise from "./mongodb";

export async function saveToReserved(data) {
  try {
    const client = await clientPromise;
    const db = client.db(); // usa el nombre de DB por defecto del URI
    const collection = db.collection("reserved");

    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error("Error guardando en reserved:", error);
    throw error;
  }
}
