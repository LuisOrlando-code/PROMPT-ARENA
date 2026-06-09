import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Challenge from './pages/Challenge'
import Leaderboard from './pages/Leaderboard'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-emerald-400 tracking-tight">
              PromptArena
            </a>
            <div className="flex gap-6 text-sm">
              <a href="/" className="hover:text-emerald-400 transition-colors">Inicio</a>
              <a href="/leaderboard" className="hover:text-emerald-400 transition-colors">Leaderboard</a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenge/:id" element={<Challenge />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
