import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const fecha = searchParams.get('fecha')
  const tipo = searchParams.get('tipo')

  if (!fecha || !tipo) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('yael')

    const reservas = await db
      .collection('reserved')
      .find({ fecha, tipo }) 
      .toArray()

    const horasOcupadas = reservas.map(r => r.hora)

    return NextResponse.json(horasOcupadas)
  } catch (err) {
    console.error('Error al obtener horarios:', err)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
