import { useState } from 'react'

export default function PromptEditor({
  onEvaluate,
  loading,
}: {
  onEvaluate: (prompt: string) => void
  loading: boolean
}) {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-3">Escribe tu prompt</h2>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Escribe aqui tu prompt..."
        rows={8}
        className="w-full bg-gray-950 border border-gray-700 rounded-lg p-4 text-gray-100 placeholder-gray-600 resize-none focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-500">
          {prompt.length} caracteres · {prompt.split(/\s+/).filter(Boolean).length} palabras
        </span>
        <button
          onClick={() => onEvaluate(prompt)}
          disabled={!prompt.trim() || loading}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium text-sm transition-all"
        >
          {loading ? 'Evaluando...' : 'Evaluar prompt'}
        </button>
      </div>
    </div>
  )
}
