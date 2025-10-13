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
    <div className="space-y-6">
      {/* Row 1: Main trend - Full width */}
      <div className="grid grid-cols-1 gap-6">
        <div className="slide-up stagger-1">
          <ConfidenceTrendArea />
        </div>
      </div>

      {/* Row 2: Inference (larger) + Radar (smaller) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 slide-up stagger-2">
          <InferenceTimeLine metrics={metrics} />
        </div>
        <div className="lg:col-span-2 slide-up stagger-3">
          <RadarPerformance metrics={metrics} />
        </div>
      </div>

      {/* Row 3: Scatter - Full width */}
      <div className="grid grid-cols-1 gap-6">
        <div className="slide-up stagger-4">
          <ComparisonScatter metrics={metrics} />
        </div>
      </div>

      {/* Row 4: Accuracy + Pie - Equal split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="slide-up stagger-5">
          <AccuracyBar metrics={metrics} />
        </div>
        <div className="slide-up stagger-6">
          <ModelSizePie metrics={metrics} />
        </div>
      </div>

      <style jsx>{`
        .slide-up {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}