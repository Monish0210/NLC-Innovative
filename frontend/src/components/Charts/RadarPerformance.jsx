import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function normalizeMetrics(metrics) {
  const defaults = {
    Feedforward: { accuracy: 0.82, model_sizes: 12.3, inference_times: 18.4 },
    GRU: { accuracy: 0.85, model_sizes: 24.7, inference_times: 31.2 },
    LSTM: { accuracy: 0.88, model_sizes: 29.1, inference_times: 38.5 },
    BERT: { accuracy: 0.94, model_sizes: 420.5, inference_times: 102.3 },
  }
  
  if (!metrics) {
    const m = defaults
    const accs = Object.values(m).map((x) => x.accuracy)
    const times = Object.values(m).map((x) => x.inference_times)
    const sizes = Object.values(m).map((x) => x.model_sizes)

    const minTime = Math.min(...times), maxTime = Math.max(...times)
    const minSize = Math.min(...sizes), maxSize = Math.max(...sizes)

    const labels = Object.keys(m)
    const acc = labels.map((k) => m[k].accuracy)
    const speed = labels.map((k) => 1 - (m[k].inference_times - minTime) / (maxTime - minTime || 1))
    const compact = labels.map((k) => 1 - (m[k].model_sizes - minSize) / (maxSize - minSize || 1))

    return { labels, acc, speed, compact }
  }

  const labels = Object.keys(metrics.accuracy)
  const acc = labels.map((k) => metrics.accuracy[k])
  const times = labels.map((k) => metrics.inference_times[k])
  const sizes = labels.map((k) => metrics.model_sizes[k])

  const minTime = Math.min(...times), maxTime = Math.max(...times)
  const minSize = Math.min(...sizes), maxSize = Math.max(...sizes)

  const speed = times.map((time) => 1 - (time - minTime) / (maxTime - minTime || 1))
  const compact = sizes.map((size) => 1 - (size - minSize) / (maxSize - minSize || 1))

  return { labels, acc, speed, compact }
}

export default function RadarPerformance({ metrics }) {
  const { labels, acc, speed, compact } = normalizeMetrics(metrics)

  const data = {
    labels: ['Accuracy', 'Speed', 'Compactness'],
    datasets: labels.map((name, idx) => ({
      label: name,
      data: [acc[idx], speed[idx], compact[idx]],
      backgroundColor: `rgba(${50 + idx * 40},99,132,0.2)`,
      borderColor: `rgba(${50 + idx * 40},99,132,1)`,
      borderWidth: 1,
    })),
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Performance Radar (normalized)</div>
      <Radar data={data} options={{ scales: { r: { min: 0, max: 1 } } }} />
    </div>
  )
}


