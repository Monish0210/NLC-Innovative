import { Scatter } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default function ComparisonScatter({ metrics }) {
  const defaults = {
    Feedforward: { accuracy: 0.82, inference_times: 18.4 },
    GRU: { accuracy: 0.85, inference_times: 31.2 },
    LSTM: { accuracy: 0.88, inference_times: 38.5 },
    BERT: { accuracy: 0.94, inference_times: 102.3 },
  }
  
  const m = metrics ? {
    Feedforward: { accuracy: metrics.accuracy.Feedforward, inference_times: metrics.inference_times.Feedforward },
    GRU: { accuracy: metrics.accuracy.GRU, inference_times: metrics.inference_times.GRU },
    LSTM: { accuracy: metrics.accuracy.LSTM, inference_times: metrics.inference_times.LSTM },
    BERT: { accuracy: metrics.accuracy.BERT, inference_times: metrics.inference_times.BERT },
  } : defaults
  
  const labels = Object.keys(m)
  const data = {
    datasets: labels.map((name, idx) => ({
      label: name,
      data: [{ x: m[name].inference_times, y: Math.round(m[name].accuracy * 100) }],
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


