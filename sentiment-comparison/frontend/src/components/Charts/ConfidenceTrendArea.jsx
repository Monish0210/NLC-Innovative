import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

// Placeholder component that would be fed by a session-level store of past predictions
export default function ConfidenceTrendArea() {
  // Fake 10-step confidence trends per model
  const labels = Array.from({ length: 10 }, (_, i) => `T${i + 1}`)
  const data = useMemo(() => ({
    labels,
    datasets: [
      { label: 'Feedforward', data: [60,62,61,63,64,66,65,67,66,68], borderColor: 'rgba(99,102,241,1)', backgroundColor: 'rgba(99,102,241,0.2)', fill: true, tension: 0.25 },
      { label: 'GRU', data: [70,71,72,71,73,74,73,75,76,77], borderColor: 'rgba(16,185,129,1)', backgroundColor: 'rgba(16,185,129,0.2)', fill: true, tension: 0.25 },
      { label: 'LSTM', data: [78,79,80,79,81,82,83,82,84,85], borderColor: 'rgba(59,130,246,1)', backgroundColor: 'rgba(59,130,246,0.2)', fill: true, tension: 0.25 },
      { label: 'BERT', data: [90,91,92,93,92,93,94,95,95,96], borderColor: 'rgba(239,68,68,1)', backgroundColor: 'rgba(239,68,68,0.2)', fill: true, tension: 0.25 },
    ],
  }), [])

  const options = { scales: { y: { min: 0, max: 100 } } }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Confidence Trends (placeholder)</div>
      <Line data={data} options={options} />
    </div>
  )
}


