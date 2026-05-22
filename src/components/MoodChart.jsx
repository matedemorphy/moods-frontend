import ReactApexChart from "react-apexcharts";
import { useMoodStatsQuery } from "../hooks/useMoodEntryQueries";

const BASE_OPTIONS = {
  chart: {
    type: "bar",
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 6,
      borderRadiusApplication: "end",
      distributed: true,
    },
  },
  dataLabels: { enabled: false },
  yaxis: {
    labels: {
      style: { fontSize: "18px" },
    },
  },
  grid: { borderColor: "#e5e7eb" },
  legend: { show: false },
  tooltip: {
    y: {
      formatter: (value) => `${value} entries`,
    },
  },
};

export default function MoodBarChart() {
  const { data = [], isPending, isError, error } = useMoodStatsQuery();

  if (isPending) return <p>Loading chart...</p>;

  if (isError) {
    return (
      <p>
        {error instanceof Error ? error.message : "Failed to load chart"}
      </p>
    );
  }

  // 1. Calculamos la serie directamente desde los datos del query
  const series = [
    {
      name: "Entries",
      data: data.map((item) => item.total),
    },
  ];

  // 2. Buscamos el valor más alto para asegurar que el eje termine en un número entero redondo
  const maxTotal = data.length > 0 ? Math.max(...data.map((d) => d.total)) : 4;

  // 3. Fusionamos las opciones base con la data dinámica y la corrección del eje X
  const options = {
    ...BASE_OPTIONS,
    xaxis: {
      categories: data.map((item) => `${item.emoji} ${item.name}`),
      // --- AQUÍ ESTÁ LA SOLUCIÓN AL PROBLEMA ---
      tickAmount: maxTotal, // Fuerza a que haya exactamente un tick por cada número entero
      min: 0,
      max: maxTotal, // Evita que ApexCharts invente decimales superiores
      labels: {
        formatter: (val) => Math.round(val), // Asegura visualmente que solo muestre enteros
      },
    },
  };

  return (
    <section>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </section>
  );
}