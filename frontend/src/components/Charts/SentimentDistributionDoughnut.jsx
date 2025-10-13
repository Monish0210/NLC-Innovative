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
          'rgba(22,163,74,0.7)', // positive
          'rgba(239,68,68,0.7)', // negative
          'rgba(234,179,8,0.7)'  // neutral
        ],
      },
    ],
  }

  return (
    <div className="card p-4">
      <div className="font-semibold mb-2">Sentiment Distribution</div>
      <Doughnut redraw data={data} options={{
        plugins: { legend: { labels: { color: '#EAEAEA' } } },
      }} />
    </div>
  )
}


