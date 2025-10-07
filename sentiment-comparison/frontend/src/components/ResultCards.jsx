export default function ResultCards({ results = [] }) {
  if (!results || results.length === 0) {
    return (
      <div className="text-sm text-gray-500">No results yet. Run an analysis above.</div>
    )
  }

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {results.map((r) => (
        <div key={r.model} className="bg-white rounded shadow p-4">
          <div className="font-semibold">{r.model}</div>
          <div className="text-sm mt-2">Sentiment: <span className="font-medium">{r.sentiment}</span></div>
          <div className="text-sm">Confidence: {(r.confidence * 100).toFixed(1)}%</div>
          <div className="text-sm">Time: {r.inference_time_ms} ms</div>
        </div>
      ))}
    </div>
  )
}


