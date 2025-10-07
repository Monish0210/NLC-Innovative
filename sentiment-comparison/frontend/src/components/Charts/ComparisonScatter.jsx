import { Scatter } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default function ComparisonScatter({ metrics }) {
  const m = metrics || {
    Feedforward: { accuracy: 0.82, avg_time: 18.4 },
    GRU: { accuracy: 0.85, avg_time: 31.2 },
    LSTM: { accuracy: 0.88, avg_time: 38.5 },
    BERT: { accuracy: 0.94, avg_time: 102.3 },
  }
  const labels = Object.keys(m)
  const data = {
    datasets: labels.map((name, idx) => ({
      label: name,
      data: [{ x: m[name].avg_time, y: Math.round(m[name].accuracy * 100) }],
      backgroundColor: `rgba(${100 + idx * 30}, 99, 132, 0.7)`,
    })),
  }
  const options = {
    scales: {
      x: { title: { display: true, text: 'Avg Time (ms)' } },
      y: { title: { display: true, text: 'Accuracy (%)' }, min: 0, max: 100 },
    },
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Accuracy vs Time</div>
      <Scatter data={data} options={options} />
    </div>
  )
}


