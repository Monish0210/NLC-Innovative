import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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


