import clientPromise from "../../../../lib/mongodb"

export async function GET(req) {
  const url = new URL(req.url)
  const tipo = url.searchParams.get('tipo')

  if (!tipo) {
    return new Response(JSON.stringify({ error: 'Tipo de cancha requerido' }), { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('yael')
    const cancha = await db.collection('canchas').findOne({ cancha: tipo })

    if (!cancha) {
      return new Response(JSON.stringify({ error: 'Cancha no encontrada' }), { status: 404 })
    }

    return new Response(JSON.stringify(cancha), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Error al obtener cancha' }), { status: 500 })
  }
}
