import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ModelSizePie({ metrics }) {
  const labels = metrics?.model_sizes ? Object.keys(metrics.model_sizes) : ['Feedforward', 'GRU', 'LSTM', 'BERT']
  const sizes = metrics?.model_sizes ? Object.values(metrics.model_sizes) : [12.3, 24.7, 29.1, 420.5]

  const data = {
    labels,
    datasets: [
      {
        data: sizes,
        backgroundColor: [
          'rgba(99,102,241,0.8)',
          'rgba(16,185,129,0.8)',
          'rgba(59,130,246,0.8)',
          'rgba(239,68,68,0.8)'
        ],
        borderColor: '#1a1a1a',
        borderWidth: 2,
        hoverOffset: 8
      },
    ],
  }

  return (
    <div className="card card-glass p-5">
      <h3 className="font-semibold text-lg mb-4 text-gray-100">Model Size Distribution (MB)</h3>
      <div style={{ height: '280px' }} className="flex items-center justify-center">
        <Pie data={data} options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { 
            legend: { 
              position: 'bottom',
              labels: { 
                color: '#EAEAEA',
                font: { size: 11, weight: '500' },
                padding: 15,
                usePointStyle: true
              }
            }
          }
        }} />
      </div>
    </div>
  )
}