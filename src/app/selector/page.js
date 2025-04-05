import React, { Suspense } from 'react'
import SelectorHorario from '../clientes/components/SelectorHorario'

function selector() {
  return (
    <div className="p-4">
         <Suspense fallback={<p>Cargando calendario...</p>}>
          <SelectorHorario/>
         </Suspense>
       </div>
  )
}

export default selector
