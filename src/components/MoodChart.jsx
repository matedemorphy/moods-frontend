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

  const series = [
    {
      name: "Entries",
      data: data.map((item) => item.total),
    },
  ];

  const maxTotal = data.length > 0 ? Math.max(...data.map((d) => d.total)) : 4;

  const options = {
    ...BASE_OPTIONS,
    xaxis: {
      categories: data.map((item) => `${item.emoji} ${item.name}`),
      tickAmount: maxTotal,
      min: 0,
      max: maxTotal,
      labels: {
        formatter: (val) => Math.round(val),
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