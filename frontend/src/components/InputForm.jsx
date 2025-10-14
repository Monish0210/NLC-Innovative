import { useState } from 'react'

export default function InputForm({ onResults }) {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) {
      alert('Please enter some text to analyze.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8008";
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }

      const data = await response.json()
      onResults(data.results) // Pass the results array up to the Home component

    } catch (err) {
      console.error('Fetch error:', err)
      setError('Failed to fetch results. Is the backend server running?')
      onResults([]) // Clear previous results on error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card card-hover p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          className="input h-36 p-3 resize-y"
          disabled={isLoading}
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </form>
    </div>
  )
}