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
        backgroundColor: (context) => {
          const chart = context.chart
          const c = chart.ctx
          const area = chart.chartArea
          if (!area) {
            return 'rgba(99,102,241,0.8)'
          }
          const gradient = c.createLinearGradient(0, area.top, 0, area.bottom)
          gradient.addColorStop(0, 'rgba(99,102,241,0.9)')   // soft purple
          gradient.addColorStop(1, 'rgba(20,184,166,0.7)')  // teal
          return gradient
        },
        borderRadius: 6,
      },
    ],
  }

  return (
    <div className="card card-glass p-4">
      <div className="font-semibold mb-2">Confidence by Model</div>
      <Bar redraw data={data} options={{
        responsive: true,
        plugins: {
          legend: { labels: { color: '#EAEAEA' }, position: 'top' },
        },
        scales: {
          x: { ticks: { color: '#888888' }, grid: { color: '#2a2a2a' } },
          y: { ticks: { color: '#888888' }, grid: { color: '#2a2a2a' } },
        },
      }} />
    </div>
  )
}


