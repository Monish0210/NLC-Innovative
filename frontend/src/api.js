import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8008';

const api = axios.create({
  baseURL: apiUrl,
})

export async function predict(text) {
  const res = await api.post('/predict', { text })
  return res.data
} 

export async function getMetrics() {
  const res = await api.get('/metrics')
  return res.data
}

export default api


