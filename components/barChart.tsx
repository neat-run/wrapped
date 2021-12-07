import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Bar chart component
export const BarChart = ({ chartData, title }) => {
  if (!registerables) return <></>;

  Chart.register(...registerables);
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
