'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const HORAS = Array.from({ length: 14 }, (_, i) => `${i + 10}:00`)

export default function SelectorHorario() {
  const [fecha, setFecha] = useState('')
  const [tipo, setTipo] = useState('')
  const [horariosOcupados, setHorariosOcupados] = useState([])
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fechaStorage = localStorage.getItem('fechaReserva')
    const tipoStorage = localStorage.getItem('tipoReserva') || 'futbol'
    setFecha(fechaStorage)
    setTipo(tipoStorage)
    fetch(`/api/horarios?fecha=${fechaStorage}&tipo=${tipoStorage}`)
      .then(res => res.json())
      .then(data => setHorariosOcupados(data))
  }, [])

  const handleSeleccion = (hora) => {
    if (horariosOcupados.includes(hora)) return alert('Horario ocupado')
    setHorarioSeleccionado(hora)
    localStorage.setItem('horarioReserva', hora)
  }

  const handleSiguiente = () => {
    if (!horarioSeleccionado) return alert('Elegí un horario')
    router.push('/formreserved')
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded shadow p-4 max-w-md w-full">
        <div className="text-center mb-4">
          <Image src="/Assets/yael.png" alt="Yael" width={100} height={100} />
        </div>
        <h2 className="text-center font-bold mb-2">Seleccionar horario</h2>
        {HORAS.map((hora) => (
          <button
            key={hora}
            onClick={() => handleSeleccion(hora)}
            className={`w-full mb-2 p-2 rounded ${horariosOcupados.includes(hora) ? 'bg-red-400' : 'bg-blue-600 text-white'}`}
            disabled={horariosOcupados.includes(hora)}
          >
            {hora}
          </button>
        ))}
        <button
          onClick={handleSiguiente}
          className="bg-black text-white w-full p-2 rounded mt-2"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
