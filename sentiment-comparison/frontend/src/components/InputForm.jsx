import { useState } from 'react'
import { predict } from '../api'

export default function InputForm({ onResults }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await predict(text)
      onResults(data.results || [])
    } catch (e) {
      onResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow space-y-3">
      <textarea
        className="w-full border rounded p-3"
        rows={4}
        placeholder="Enter text to analyze sentiment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  )
}


