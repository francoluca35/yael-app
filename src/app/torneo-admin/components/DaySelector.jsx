export default function DaySelector({ selectedDay, setSelectedDay }) {
  const days = ["L a J", "Viernes", "Sabado", "Domingo"];

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => setSelectedDay(day)}
          className={`px-4 py-2 rounded-full text-white font-bold ${
            selectedDay === day ? "bg-[#2c37d2]" : "bg-gray-500"
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
