import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Compare from './pages/Compare'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-textPrimary">
        <header className="sticky top-0 z-20 border-b border-border/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container-max py-3 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 font-semibold text-textPrimary">
              <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-600"></span>
              <span>Sentiment Comparison</span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link to="/" className="px-3 py-2 rounded-md text-sm text-textSecondary hover:text-textPrimary hover:bg-surface transition-colors [aria-current='page']:text-textPrimary [aria-current='page']:bg-surface">
                Home
              </Link>
              <Link to="/compare" className="px-3 py-2 rounded-md text-sm text-textSecondary hover:text-textPrimary hover:bg-surface transition-colors [aria-current='page']:text-textPrimary [aria-current='page']:bg-surface">
                Compare
              </Link>
            </nav>
          </div>
        </header>
        <main className="container-max py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App


