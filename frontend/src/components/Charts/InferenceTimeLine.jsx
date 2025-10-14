import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function InferenceTimeLine({ metrics }) {
  const labels = metrics?.inference_times ? Object.keys(metrics.inference_times) : ['RNN', 'GRU', 'LSTM', 'BERT']
  const times = metrics?.inference_times ? Object.values(metrics.inference_times) : [18.4, 31.2, 38.5, 102.3]

  const data = {
    labels,
    datasets: [
      {
        label: 'Avg Inference Time (ms)',
        data: times,
        borderColor: 'rgba(99,102,241,1)',
        backgroundColor: 'rgba(99,102,241,0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99,102,241,1)',
        pointBorderColor: '#1a1a1a',
        pointBorderWidth: 2
      },
    ],
  }

  return (
    <div className="card card-glass p-5">
      <h3 className="font-semibold text-lg mb-4 text-gray-100">Average Inference Time</h3>
      <div style={{ height: '280px' }}>
        <Line redraw data={data} options={{
          responsive: true,
          maintainAspectRatio: false,
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
          scales: {
            x: { 
              ticks: { color: '#888888', font: { size: 11 } }, 
              grid: { color: '#2a2a2a', drawTicks: false },
              border: { display: false }
            },
            y: { 
              ticks: { color: '#888888', font: { size: 11 } }, 
              grid: { color: '#2a2a2a', drawTicks: false },
              border: { display: false }
            },
          },
        }} />
      </div>
    </div>
  )
}