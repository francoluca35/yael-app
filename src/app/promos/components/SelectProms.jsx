export default function SelectProms() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Promociones</h1>

        <button className="w-full flex items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <div className="bg-blue-900 text-white rounded-full p-3 mr-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18.5C7.26 20.5 3.5 16.74 3.5 12S7.26 3.5 12 3.5 20.5 7.26 20.5 12 16.74 20.5 12 20.5z" />
              <circle cx="12" cy="12" r="5" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-800">Torneo de Fútbol</p>
            <p className="text-gray-500 text-sm">20% de descuento - Sábados</p>
          </div>
        </button>

        <button className="w-full flex items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <div className="bg-blue-900 text-white rounded-full p-3 mr-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8 4.56-.93 8-4.96 8-9.8 0-5.52-4.48-10-10-10zM7 11l5 3 5-3-5-3-5 3z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-800">Torneo de Pádel</p>
            <p className="text-gray-500 text-sm">Inscripción gratis</p>
          </div>
        </button>

        <button className="w-full flex items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <div className="bg-blue-900 text-white rounded-full p-3 mr-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 00-10 10 10 10 0 1010-10zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-800">Promo Cumpleaños</p>
            <p className="text-gray-500 text-sm">Cancha + pizza + gaseosas</p>
          </div>
        </button>
      </div>
    </div>
  );
}
