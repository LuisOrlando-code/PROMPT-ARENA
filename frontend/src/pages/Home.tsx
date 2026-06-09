import { useState, useEffect } from 'react'
import ChallengeCard from '../components/ChallengeCard'
import { apiFetch } from '../api'

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: string
  category: string
  criteria: string[]
}

export default function Home() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    apiFetch('/api/challenges').then(setChallenges)
  }, [])

  const filtered = filter === 'all' ? challenges : challenges.filter(c => c.difficulty === filter)

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          PromptArena
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Pon a prueba tus habilidades de prompt engineering. Resuelve desafíos, recibe feedback de la IA y compite en el leaderboard.
        </p>
      </div>

      <div className="flex gap-3 justify-center mb-8">
        {['all', 'easy', 'medium', 'hard'].map(d => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              filter === d
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:border-gray-600'
            }`}
          >
            {d === 'all' ? 'Todos' : d === 'easy' ? 'Fácil' : d === 'medium' ? 'Medio' : 'Difícil'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </main>
  )
}
