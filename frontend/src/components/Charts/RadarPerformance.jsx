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

  const colors = [
    { bg: 'rgba(99,102,241,0.2)', border: 'rgba(99,102,241,1)' },
    { bg: 'rgba(16,185,129,0.2)', border: 'rgba(16,185,129,1)' },
    { bg: 'rgba(59,130,246,0.2)', border: 'rgba(59,130,246,1)' },
    { bg: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,1)' }
  ]

  const data = {
    labels: ['Accuracy', 'Speed', 'Compactness'],
    datasets: labels.map((name, idx) => ({
      label: name,
      data: [acc[idx], speed[idx], compact[idx]],
      backgroundColor: colors[idx].bg,
      borderColor: colors[idx].border,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5
    })),
  }

  return (
    <div className="card card-glass p-5">
      <h3 className="font-semibold text-lg mb-4 text-gray-100">Performance Radar</h3>
      <div style={{ height: '300px' }}>
        <Radar redraw data={data} options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: { 
            r: { 
              min: 0, 
              max: 1, 
              grid: { color: '#2a2a2a' }, 
              pointLabels: { 
                color: '#EAEAEA', 
                font: { size: 12, weight: '500' } 
              }, 
              ticks: { 
                backdropColor: 'transparent', 
                color: '#888888', 
                stepSize: 0.25 
              }
            } 
          },
          plugins: { 
            legend: { 
              labels: { 
                color: '#EAEAEA',
                font: { size: 11, weight: '500' },
                padding: 12,
                usePointStyle: true
              }
            }
          },
        }} />
      </div>
    </div>
  )
}