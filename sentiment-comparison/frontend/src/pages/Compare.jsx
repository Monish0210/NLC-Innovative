import { useEffect, useState } from 'react'
import { getMetrics } from '../api'
import AccuracyBar from '../components/Charts/AccuracyBar'
import ModelSizePie from '../components/Charts/ModelSizePie'
import InferenceTimeLine from '../components/Charts/InferenceTimeLine'
import RadarPerformance from '../components/Charts/RadarPerformance'
import ComparisonScatter from '../components/Charts/ComparisonScatter'
import ConfidenceTrendArea from '../components/Charts/ConfidenceTrendArea'

export default function Compare() {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    getMetrics().then(setMetrics).catch(() => setMetrics(null))
  }, [])

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <AccuracyBar metrics={metrics} />
        <ModelSizePie metrics={metrics} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <InferenceTimeLine metrics={metrics} />
        <RadarPerformance metrics={metrics} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <ComparisonScatter metrics={metrics} />
        <ConfidenceTrendArea />
      </div>
    </div>
  )
}


