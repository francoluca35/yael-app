import React, { Suspense } from 'react'
import SelectorHorario from '../clientes/components/SelectorHorario'
import FormReserved from '../clientes/components/FormReserved'

function selector() {
  return (
    <div className="p-4">
         <Suspense fallback={<p>Cargando calendario...</p>}>
          <FormReserved />
         </Suspense>
       </div>
  )
}

export default selector
