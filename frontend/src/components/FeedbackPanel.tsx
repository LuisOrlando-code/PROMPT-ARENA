interface Evaluation {
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
}

export default function FeedbackPanel({ evaluation }: { evaluation: Evaluation }) {
  const isGood = evaluation.score >= 7

  return (
    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Feedback</h2>

      <div className={`p-4 rounded-lg mb-6 ${isGood ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
        <p className={`text-sm ${isGood ? 'text-green-400' : 'text-yellow-400'}`}>{evaluation.feedback}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-emerald-400 mb-3">Fortalezas</h3>
          <ul className="space-y-2">
            {evaluation.strengths.map((s, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-yellow-400 mb-3">Mejoras sugeridas</h3>
          <ul className="space-y-2">
            {evaluation.improvements.map((s, i) => (
              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">!</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
