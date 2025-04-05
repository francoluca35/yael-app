import clientPromise from "../../../../lib/mongodb"

export async function POST(req) {
  try {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db('yael')

    const { id, fecha, hora, tipo, nombre, phone, pago, estado, mp } = body

    await db.collection('reserved').insertOne({
      id,
      fecha,
      hora,
      tipo,
      nombre,
      phone,
      pago,
      estado,
      mp
    })

    return new Response(JSON.stringify({ message: 'Reserva completa' }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Error al guardar reserva' }), { status: 500 })
  }
}
