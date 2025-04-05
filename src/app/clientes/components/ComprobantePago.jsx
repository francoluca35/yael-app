// components/ComprobantePago.jsx
export default function ComprobantePago({ datos }) {
    return (
      <div className="bg-white p-6 max-w-md mx-auto mt-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Comprobante de Reserva</h2>
        <p><strong>Nombre:</strong> {datos.nombre}</p>
        <p><strong>Teléfono:</strong> {datos.telefono}</p>
        <p><strong>Cancha:</strong> {datos.cancha}</p>
        <p><strong>Día:</strong> {datos.fecha}</p>
        <p><strong>Horario:</strong> {datos.hora}</p>
        <p><strong>Monto pagado:</strong> ${datos.pago === "seña" ? 2500 : 5000}</p>
      </div>
    );
  }
  