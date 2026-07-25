import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function DashboardCharts({ stats }) {
  const bookingData = {
    labels: ["Booked", "Started", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          stats.booked,
          stats.started,
          stats.completed,
          stats.cancelled,
        ],
        backgroundColor: [
          "#0b9fc8",
          "#ffc107",
          "#198754",
          "#dc3545",
        ],
      },
    ],
  };

  const revenueData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Completed Revenue",
        data: [stats.revenue],
        backgroundColor: "#198754",
      },
    ],
  };

  return (
    <div className="row mb-5">

      <div className="col-lg-6 mb-4">

        <div
          className="card shadow border-0"
          style={{ borderRadius: "20px" }}
        >
          <div className="card-body">

            <h4 className="text-center mb-4">
              Booking Status
            </h4>

            <Pie data={bookingData} />

          </div>
        </div>

      </div>

      <div className="col-lg-6 mb-4">

        <div
          className="card shadow border-0"
          style={{ borderRadius: "20px" }}
        >
          <div className="card-body">

            <h4 className="text-center mb-4">
              Revenue
            </h4>

            <Bar data={revenueData} />

          </div>
        </div>

      </div>

    </div>
  );
}

export default DashboardCharts;