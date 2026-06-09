import { useNavigate } from 'react-router-dom'

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: string
  category: string
  criteria: string[]
}

const diffColor: Record<string, string> = {
  easy: 'text-green-400 border-green-500/30',
  medium: 'text-yellow-400 border-yellow-500/30',
  hard: 'text-red-400 border-red-500/30',
}

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/challenge/${challenge.id}`)}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-emerald-500/50 hover:bg-gray-800/50 transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider ${diffColor[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{challenge.category}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors">{challenge.title}</h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{challenge.description}</p>
      <div className="flex gap-2">
        {challenge.criteria.map(c => (
          <span key={c} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full border border-gray-700">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
