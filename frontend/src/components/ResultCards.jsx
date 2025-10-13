export default function ResultCards({ results = [] }) {
  if (!results || results.length === 0) {
    return (
      <div className="text-sm text-textSecondary flex items-center justify-center h-24 card">
        No results yet. Run an analysis above.
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-4 gap-4 fade-in slide-up">
      {results.map((r) => (
        <div key={r.model} className="card card-hover p-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold truncate">{r.model}</div>
            <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs text-textSecondary">
              {(r.confidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="text-sm mt-3">Sentiment: <span className="font-medium">{r.sentiment}</span></div>
          <div className="text-sm text-textSecondary mt-1">Time: {r.inference_time_ms} ms</div>
        </div>
      ))}
    </div>
  )
}


