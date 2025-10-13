import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function AccuracyBar({ metrics }) {
  const labels = metrics?.accuracy ? Object.keys(metrics.accuracy) : ['Feedforward', 'GRU', 'LSTM', 'BERT']
  const values = metrics?.accuracy ? Object.values(metrics.accuracy).map((acc) => Math.round(acc * 100)) : [82, 85, 88, 94]

  const colors = [
    'rgba(99,102,241,0.85)',
    'rgba(16,185,129,0.85)',
    'rgba(59,130,246,0.85)',
    'rgba(239,68,68,0.85)'
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Test Accuracy (%)',
        data: values,
        backgroundColor: colors,
        borderRadius: 8,
        borderWidth: 0,
        barThickness: 50
      },
    ],
  }

  return (
    <div className="card card-glass p-5">
      <h3 className="font-semibold text-lg mb-4 text-gray-100">Model Accuracy Comparison</h3>
      <div style={{ height: '280px' }}>
        <Bar redraw data={data} options={{
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
              min: 75,
              max: 100,
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