import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function SentimentDistributionDoughnut({ results = [] }) {
  const counts = { Positive: 0, Negative: 0, Neutral: 0 }
  results.forEach((r) => {
    counts[r.sentiment] = (counts[r.sentiment] || 0) + 1
  })
  const labels = Object.keys(counts)
  const values = Object.values(counts)

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          'rgba(16,185,129,0.7)',
          'rgba(239,68,68,0.7)',
          'rgba(234,179,8,0.7)'
        ],
      },
    ],
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-2">Sentiment Distribution</div>
      <Doughnut data={data} />
    </div>
  )
}


