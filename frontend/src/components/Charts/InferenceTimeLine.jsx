import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function InferenceTimeLine({ metrics }) {
  const labels = metrics?.inference_times ? Object.keys(metrics.inference_times) : ['Feedforward', 'GRU', 'LSTM', 'BERT']
  const times = metrics?.inference_times ? Object.values(metrics.inference_times) : [18.4, 31.2, 38.5, 102.3]

  const data = {
    labels,
    datasets: [
      {
        label: 'Avg Inference Time (ms)',
        data: times,
        borderColor: 'rgba(59,130,246,1)',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.25,
        fill: true,
      },
    ],
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Inference Time</div>
      <Line data={data} options={{ responsive: true }} />
    </div>
  )
}


