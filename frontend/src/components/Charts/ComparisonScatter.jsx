import { Scatter } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default function ComparisonScatter({ metrics }) {
  const defaults = {
    RNN: { accuracy: 0.82, inference_times: 18.4 },
    GRU: { accuracy: 0.85, inference_times: 31.2 },
    LSTM: { accuracy: 0.88, inference_times: 38.5 },
    BERT: { accuracy: 0.94, inference_times: 102.3 },
  }
  
  const m = metrics ? {
    RNN: { accuracy: metrics.accuracy.RNN, inference_times: metrics.inference_times.RNN },
    GRU: { accuracy: metrics.accuracy.GRU, inference_times: metrics.inference_times.GRU },
    LSTM: { accuracy: metrics.accuracy.LSTM, inference_times: metrics.inference_times.LSTM },
    BERT: { accuracy: metrics.accuracy.BERT, inference_times: metrics.inference_times.BERT },
  } : defaults

  const colors = [
    'rgba(99,102,241,0.8)',
    'rgba(16,185,129,0.8)',
    'rgba(59,130,246,0.8)',
    'rgba(239,68,68,0.8)'
  ]
  
  const labels = Object.keys(m)
  const data = {
    datasets: labels.map((name, idx) => ({
      label: name,
      data: [{ x: m[name].inference_times, y: Math.round(m[name].accuracy * 100) }],
      backgroundColor: colors[idx],
      borderColor: colors[idx].replace('0.8', '1'),
      borderWidth: 2,
      pointRadius: 8,
      pointHoverRadius: 10
    })),
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        title: { 
          display: true, 
          text: 'Avg Inference Time (ms)', 
          color: '#EAEAEA', 
          font: { size: 12, weight: '600' } 
        }, 
        ticks: { color: '#888888', font: { size: 11 } }, 
        grid: { color: '#2a2a2a', drawTicks: false },
        border: { display: false }
      },
      y: { 
        title: { 
          display: true, 
          text: 'Accuracy (%)', 
          color: '#EAEAEA', 
          font: { size: 12, weight: '600' } 
        }, 
        min: 75, 
        max: 100, 
        ticks: { color: '#888888', font: { size: 11 } }, 
        grid: { color: '#2a2a2a', drawTicks: false },
        border: { display: false }
      },
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
  }

  return (
    <div className="card card-glass p-5">
      <h3 className="font-semibold text-lg mb-4 text-gray-100">Accuracy vs Inference Time Trade-off</h3>
      <div style={{ height: '340px' }}>
        <Scatter redraw data={data} options={options} />
      </div>
    </div>
  )
}