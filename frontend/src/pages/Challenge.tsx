import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PromptEditor from '../components/PromptEditor'
import ScoreDisplay from '../components/ScoreDisplay'
import FeedbackPanel from '../components/FeedbackPanel'

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: string
  category: string
  criteria: string[]
}

interface Evaluation {
  score: number
  maxScore: number
  scores: Record<string, number>
  feedback: string
  strengths: string[]
  improvements: string[]
  promptLength: number
  wordCount: number
}

export default function Challenge() {
  const { id } = useParams()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/challenges/${id}`)
      .then(res => res.json())
      .then(setChallenge)
  }, [id])

  const handleEvaluate = async (prompt: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/challenges/${id}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      setEvaluation(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!challenge) return <div className="text-center py-20 text-gray-400">Cargando...</div>

  const diffColor = challenge.difficulty === 'easy' ? 'text-green-400' : challenge.difficulty === 'medium' ? 'text-yellow-400' : 'text-red-400'

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${diffColor}`}>
            {challenge.difficulty}
          </span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{challenge.category}</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">{challenge.title}</h1>
        <p className="text-gray-400">{challenge.description}</p>
        <div className="flex gap-2 mt-4">
          {challenge.criteria.map(c => (
            <span key={c} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PromptEditor onEvaluate={handleEvaluate} loading={loading} />
        {evaluation && <ScoreDisplay evaluation={evaluation} />}
      </div>

      {evaluation && (
        <FeedbackPanel evaluation={evaluation} />
      )}
    </main>
  )
}
