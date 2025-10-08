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
      const response = await fetch('http://127.0.0.1:8008/predict', {
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
    <div className="bg-white p-6 border rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  )
}