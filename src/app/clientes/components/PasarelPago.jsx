// components/PasarelaPago.jsx
export default function PasarelaPago({ datos, onPagar }) {
    const monto = datos.pago === "seña" ? 2500 : 5000;
  
    return (
      <div className="text-center mt-6">
        <p className="mb-4">Vas a pagar: <strong>${monto}</strong></p>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded"
          onClick={() => onPagar(monto)}
        >
          Ir a pagar con MercadoPago
        </button>
      </div>
    );
  }
  