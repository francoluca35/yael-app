import mercadopago from '../../../../lib/mercadoPagoClient'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { title, price, tipoPago } = await req.json()

    const preference = {
      items: [
        {
          title,
          unit_price: Number(price),
          quantity: 1,
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/formreserved?success=true&tipoPago=${tipoPago}`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/formreserved?success=false`,
      },
      auto_return: 'approved',
    }

    const response = await mercadopago.preferences.create(preference)

    return NextResponse.json({ url: response.body.init_point })
  } catch (error) {
    console.error('MercadoPago ERROR:', error)
    return NextResponse.json({ error: 'Error creando preferencia', message: error.message }, { status: 500 })
  }
}
