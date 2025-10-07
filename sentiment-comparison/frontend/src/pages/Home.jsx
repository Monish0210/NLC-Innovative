import { useState } from 'react'
import InputForm from '../components/InputForm'
import ResultCards from '../components/ResultCards'
import ConfidenceBar from '../components/Charts/ConfidenceBar'
import SentimentDistributionDoughnut from '../components/Charts/SentimentDistributionDoughnut'

export default function Home() {
  const [results, setResults] = useState([])

  return (
    <div className="space-y-8">
      <InputForm onResults={setResults} />
      <ResultCards results={results} />
      <div className="grid md:grid-cols-2 gap-6">
        <ConfidenceBar results={results} />
        <SentimentDistributionDoughnut results={results} />
      </div>
    </div>
  )
}


