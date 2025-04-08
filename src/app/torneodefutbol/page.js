import React, { Suspense, lazy } from "react";

const FormTorneoFutbol = lazy(() => import("./components/FormTorneoFutbol"));

function TorneoDeFutbol() {
  return (
    <div>
      <Suspense
        fallback={
          <p className="text-center text-gray-700">Cargando formulario...</p>
        }
      >
        <FormTorneoFutbol />
      </Suspense>
    </div>
  );
}

export default TorneoDeFutbol;
