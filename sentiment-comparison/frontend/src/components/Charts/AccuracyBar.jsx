import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function AccuracyBar({ metrics }) {
  const labels = metrics ? Object.keys(metrics) : ['Feedforward', 'GRU', 'LSTM', 'BERT']
  const values = metrics ? Object.values(metrics).map((m) => Math.round(m.accuracy * 100)) : [82, 85, 88, 94]

  const data = {
    labels,
    datasets: [
      {
        label: 'Test Accuracy (%)',
        data: values,
        backgroundColor: 'rgba(16,185,129,0.6)',
      },
    ],
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Accuracy Comparison</div>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  )
}


