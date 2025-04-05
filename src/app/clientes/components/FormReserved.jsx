'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export default function FormReserved() {
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [tipo, setTipo] = useState('')
  const [precio, setPrecio] = useState({ precio: '', sena: '' })
  const [form, setForm] = useState({ nombre: '', telefono: '', formaPago: '', tipoPago: '' })

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setFecha(localStorage.getItem('fechaReserva') || '')
    setHora(localStorage.getItem('horarioReserva') || '')
    const tipoStorage = localStorage.getItem('tipoReserva') || 'futbol'
    setTipo(tipoStorage)

    fetch(`/api/canchas?tipo=${tipoStorage}`)
      .then(res => res.json())
      .then(data => setPrecio({ precio: data.precio, sena: data.sena }))
  }, [])

  useEffect(() => {
    const success = searchParams.get('success')
    const tipoPago = searchParams.get('tipoPago')
  
    const formData = JSON.parse(localStorage.getItem('formReserva') || '{}')
  
    // 👇 Evita continuar si falta precio o tipoPago
    if (
      success === 'true' &&
      precio.precio !== '' &&
      precio.sena !== '' &&
      tipoPago
    ) {
      const pagoFinal = tipoPago === 'total' ? null : precio[tipoPago]  // ✅ precio.sena o precio.total
      const estado = tipoPago === 'total' ? 'pagototal' : 'se\u00f1a'
      const mp = localStorage.getItem('mpToken') || 'mp'
  
      fetch('/api/reserved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: uuidv4(),
          fecha: formData.fecha,
          hora: formData.hora,
          tipo: formData.tipo,
          nombre: formData.nombre,
          phone: formData.phone,
          pago: pagoFinal,
          estado,
          mp
        })
      })
        .then(() => {
          alert('¡Reserva confirmada!')
          localStorage.removeItem('formReserva')
          router.replace('/')
        })
    }
  }, [searchParams, precio])
  
  
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nombre || !form.telefono || !form.formaPago || !form.tipoPago ) {
      return alert('Completá todos los campos')
    }
  
    localStorage.setItem('mpToken', form.formaPago)
  
    localStorage.setItem('formReserva', JSON.stringify({
      nombre: form.nombre,
      phone: form.telefono,
      fecha,             
      hora,             
      tipo,                
    }))
    
    const res = await fetch('/api/mercadopago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `Reserva ${tipo}`,
        price: form.tipoPago === 'total' ? precio.precio : precio.sena,
        tipoPago: form.tipoPago
      })
    })
  
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }
  

  const monto = form.tipoPago === 'total' ? precio.precio : precio.sena

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <div className="text-center mb-4">
          <Image src="/Assets/yael.png" alt="logo" width={100} height={100} />
        </div>
        <h2 className="text-center font-bold mb-4">Formulario de Reserva</h2>
        <p className="mb-2 text-center bg-blue-100 p-2 rounded">Fecha: {fecha} - Hora: {hora}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="p-2 border rounded" />
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" required className="p-2 border rounded" />
          <select name="formaPago" value={form.formaPago} onChange={handleChange} required className="p-2 border rounded">
            <option value="">Forma de pago</option>
            <option value="mercado_pago">Mercado Pago</option>
            <option value="transferencia">Transferencia</option>
          </select>
          <select name="tipoPago" value={form.tipoPago} onChange={handleChange} required className="p-2 border rounded">
            <option value="">Tipo de pago</option>
            <option value="total">Pagar total</option>
            <option value="sena">Pagar seña</option>
          </select>
          {form.tipoPago && (
            <div className="bg-gray-800 text-white p-2 rounded text-center">
              Precio a pagar: ${monto}
            </div>
          )}
          <button className="bg-black text-white p-2 rounded">Siguiente</button>
        </form>
      </div>
    </div>
  )
}
