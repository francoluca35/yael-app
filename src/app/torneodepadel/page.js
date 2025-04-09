import React, { Suspense, lazy } from "react";
import BackButton from "../components/BackButton";

const FormTorneoPadel = lazy(() => import("./components/FormTorneoPadel"));

function TorneoDeFutbol() {
  return (
    <div>
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <Suspense
        fallback={
          <p className="text-center text-gray-700">Cargando formulario...</p>
        }
      >
        <FormTorneoPadel />
      </Suspense>
    </div>
  );
}

export default TorneoDeFutbol;
