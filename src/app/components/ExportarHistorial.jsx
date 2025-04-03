"use client";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ExportarHistorial({ data, desde, hasta }) {
  if (!data || data.length === 0) return null;

  const exportarPDF = () => {
    const doc = new jsPDF();

    // Imagen (logo base64 o URL)
    const imgUrl = "/Assets/yael.png"; // Reemplazá por tu imagen
    doc.addImage(imgUrl, "PNG", 160, 5, 30, 30);

    // Título centrado
    doc.setFontSize(16);
    doc.text("Historial semanal", doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });

    const filas = data.map((item) => [
      item.nombre,
      item.phone,
      item.fecha,
      item.hora,
      item.tipo,
    ]);

    doc.autoTable({
      head: [["Nombre", "Teléfono", "Fecha", "Hora", "Tipo"]],
      body: filas,
      startY: 35,
      styles: {
        halign: "center",
        valign: "middle",
      },
      didParseCell: function (data) {
        if (data.section === 'body') {
          const tipo = data.row.raw[4];
          if (tipo === "futbol") {
            data.cell.styles.fillColor = [255, 230, 230]; // rojo claro
          } else if (tipo === "padel") {
            data.cell.styles.fillColor = [230, 255, 230]; // verde claro
          }
        }
      },
    });

    doc.save(`semana-completa-${desde}_a_${hasta}.pdf`);
  };

  const exportarExcel = () => {
    const hoja = data.map((item) => ({
      Nombre: item.nombre,
      Teléfono: item.phone,
      Fecha: item.fecha,
      Hora: item.hora,
      Tipo: item.tipo,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(hoja);
    XLSX.utils.book_append_sheet(wb, ws, "Historial");
    XLSX.writeFile(wb, `semana-completa-${desde}_a_${hasta}.xlsx`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <button
        onClick={exportarPDF}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm w-full sm:w-auto"
      >
        Descargar PDF
      </button>
      <button
        onClick={exportarExcel}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm w-full sm:w-auto"
      >
        Descargar Excel
      </button>
    </div>
  );
}
