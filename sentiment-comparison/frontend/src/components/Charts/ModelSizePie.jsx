import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ModelSizePie({ metrics }) {
  const labels = metrics ? Object.keys(metrics) : ['Feedforward', 'GRU', 'LSTM', 'BERT']
  const sizes = metrics ? Object.values(metrics).map((m) => m.size_mb) : [12.3, 24.7, 29.1, 420.5]

  const data = {
    labels,
    datasets: [
      {
        data: sizes,
        backgroundColor: [
          'rgba(99,102,241,0.7)',
          'rgba(16,185,129,0.7)',
          'rgba(59,130,246,0.7)',
          'rgba(239,68,68,0.7)'
        ],
      },
    ],
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Model Size (MB)</div>
      <Pie data={data} />
    </div>
  )
}


