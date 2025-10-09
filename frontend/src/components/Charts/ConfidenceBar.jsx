import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function ConfidenceBar({ results = [] }) {
  const labels = results.map((r) => r.model)
  const data = {
    labels,
    datasets: [
      {
        label: 'Confidence',
        data: results.map((r) => Math.round(r.confidence * 100)),
        backgroundColor: 'rgba(59,130,246,0.6)',
      },
    ],
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Confidence by Model</div>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  )
}


