import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function normalizeMetrics(metrics) {
  // Normalize accuracy (higher better), avg_time (lower better), size_mb (lower better)
  const defaults = {
    Feedforward: { accuracy: 0.82, size_mb: 12.3, avg_time: 18.4 },
    GRU: { accuracy: 0.85, size_mb: 24.7, avg_time: 31.2 },
    LSTM: { accuracy: 0.88, size_mb: 29.1, avg_time: 38.5 },
    BERT: { accuracy: 0.94, size_mb: 420.5, avg_time: 102.3 },
  }
  const m = metrics || defaults
  const accs = Object.values(m).map((x) => x.accuracy)
  const times = Object.values(m).map((x) => x.avg_time)
  const sizes = Object.values(m).map((x) => x.size_mb)

  const minTime = Math.min(...times), maxTime = Math.max(...times)
  const minSize = Math.min(...sizes), maxSize = Math.max(...sizes)

  const labels = Object.keys(m)
  const acc = labels.map((k) => m[k].accuracy) // already 0-1
  const speed = labels.map((k) => 1 - (m[k].avg_time - minTime) / (maxTime - minTime || 1))
  const compact = labels.map((k) => 1 - (m[k].size_mb - minSize) / (maxSize - minSize || 1))

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


