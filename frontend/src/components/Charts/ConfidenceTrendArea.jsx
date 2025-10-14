import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function ConfidenceTrendArea() {
  const labels = Array.from({ length: 10 }, (_, i) => `T${i + 1}`)
  const data = useMemo(() => ({
    labels,
    datasets: [
      { 
        label: 'RNN', 
        data: [60,62,61,63,64,66,65,67,66,68], 
        borderColor: 'rgba(99,102,241,1)', 
        backgroundColor: 'rgba(99,102,241,0.15)', 
        fill: true, 
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2
      },
      { 
        label: 'GRU', 
        data: [70,71,72,71,73,74,73,75,76,77], 
        borderColor: 'rgba(16,185,129,1)', 
        backgroundColor: 'rgba(16,185,129,0.15)', 
        fill: true, 
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2
      },
      { 
        label: 'LSTM', 
        data: [78,79,80,79,81,82,83,82,84,85], 
        borderColor: 'rgba(59,130,246,1)', 
        backgroundColor: 'rgba(59,130,246,0.15)', 
        fill: true, 
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2
      },
      { 
        label: 'BERT', 
        data: [90,91,92,93,92,93,94,95,95,96], 
        borderColor: 'rgba(239,68,68,1)', 
        backgroundColor: 'rgba(239,68,68,0.15)', 
        fill: true, 
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2
      },
    ],
  }), [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      y: { 
        min: 50, 
        max: 100,
        ticks: { color: '#888888', font: { size: 11 } }, 
        grid: { color: '#2a2a2a', drawTicks: false },
        border: { display: false }
      },
      x: { 
        ticks: { color: '#888888', font: { size: 11 } }, 
        grid: { color: '#2a2a2a', drawTicks: false },
        border: { display: false }
      }
    },
    plugins: {
      legend: { 
        labels: { 
          color: '#EAEAEA',
          font: { size: 11, weight: '500' },
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  }

  return (
    <div className="card card-glass p-5">
      <h3 className="font-semibold text-lg mb-4 text-gray-100">Confidence Trends Over Time</h3>
      <div style={{ height: '280px' }}>
        <Line redraw data={data} options={options} />
      </div>
    </div>
  )
}