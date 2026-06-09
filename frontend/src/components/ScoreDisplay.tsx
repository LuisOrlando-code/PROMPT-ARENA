interface Evaluation {
  score: number
  maxScore: number
  scores: Record<string, number>
  promptLength: number
  wordCount: number
}

function getScoreColor(score: number) {
  if (score >= 7) return 'text-green-400'
  if (score >= 5) return 'text-yellow-400'
  return 'text-red-400'
}

function getScoreBarColor(score: number) {
  if (score >= 7) return 'bg-green-400'
  if (score >= 5) return 'bg-yellow-400'
  return 'bg-red-400'
}

export default function ScoreDisplay({ evaluation }: { evaluation: Evaluation }) {
  const color = getScoreColor(evaluation.score)

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Resultado</h2>

      <div className="text-center mb-6">
        <div className={`text-6xl font-bold ${color}`}>{evaluation.score}</div>
        <div className="text-gray-500 text-sm">de {evaluation.maxScore}</div>
      </div>

      <div className="space-y-3">
        {Object.entries(evaluation.scores).map(([criterion, score]) => (
          <div key={criterion}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300 capitalize">{criterion}</span>
              <span className={getScoreColor(score)}>{score}/10</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getScoreBarColor(score)} transition-all duration-500`}
                style={{ width: `${score * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800 grid grid-cols-2 gap-4 text-center text-sm">
        <div>
          <div className="text-gray-400">Caracteres</div>
          <div className="text-lg font-semibold">{evaluation.promptLength}</div>
        </div>
        <div>
          <div className="text-gray-400">Palabras</div>
          <div className="text-lg font-semibold">{evaluation.wordCount}</div>
        </div>
      </div>
    </div>
  )
}
