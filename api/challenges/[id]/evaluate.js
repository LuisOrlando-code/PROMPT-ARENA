const challenges = [
  {
    "id": 1,
    "title": "Explica la gravedad cuántica",
    "description": "Haz que la IA explique la gravedad cuántica a un niño de 10 años. Debe ser simple pero precisa.",
    "difficulty": "medium",
    "category": "simplificación",
    "criteria": ["claridad", "simplicidad", "precisión científica"]
  },
  {
    "id": 2,
    "title": "Poema sobre un algoritmo",
    "description": "Pídele a la IA que escriba un poema que describa cómo funciona un algoritmo de ordenamiento.",
    "difficulty": "easy",
    "category": "creatividad",
    "criteria": ["creatividad", "estructura", "precisión técnica"]
  },
  {
    "id": 3,
    "title": "Depura este código",
    "description": "Escribe un prompt para que la IA encuentre y explique el bug en un código que no funciona.",
    "difficulty": "hard",
    "category": "depuración",
    "criteria": ["claridad", "especificidad", "utilidad"]
  },
  {
    "id": 4,
    "title": "Asistente de cocina",
    "description": "Pídele a la IA que genere una receta creativa usando solo 3 ingredientes que tú le especifiques.",
    "difficulty": "easy",
    "category": "creatividad",
    "criteria": ["creatividad", "detalle", "practicidad"]
  },
  {
    "id": 5,
    "title": "Traductor cultural",
    "description": "Haz que la IA traduzca una expresión coloquial mexicana al inglés explicando su contexto cultural.",
    "difficulty": "medium",
    "category": "traducción",
    "criteria": ["precisión", "contexto cultural", "claridad"]
  }
];

function evaluatePrompt(challengeId, prompt) {
  const challenge = challenges.find(c => c.id === challengeId);
  if (!challenge) return { error: 'Challenge not found' };

  const scores = {};
  let totalScore = 0;

  challenge.criteria.forEach(criterion => {
    const score = scoreCriterion(criterion, prompt);
    scores[criterion] = score;
    totalScore += score;
  });

  const averageScore = Math.round((totalScore / challenge.criteria.length) * 10) / 10;
  const feedback = generateFeedback(averageScore);
  const strengths = generateStrengths(scores);
  const improvements = generateImprovements(scores);

  return {
    score: averageScore,
    maxScore: 10,
    scores,
    feedback,
    strengths,
    improvements,
    promptLength: prompt.length,
    wordCount: prompt.split(/\s+/).filter(Boolean).length
  };
}

function scoreCriterion(criterion, prompt) {
  let score = 5;

  if (criterion === 'claridad') {
    if (prompt.length > 50 && prompt.length < 500) score += 2;
    if (prompt.includes('por favor') || prompt.includes('please')) score += 1;
    if (prompt.split('.').length > 2) score += 1;
    if (prompt.includes('?') && prompt.includes(':')) score += 1;
  }

  if (criterion === 'creatividad') {
    if (prompt.includes('como si') || prompt.includes('como') || prompt.includes('imagin')) score += 2;
    if (prompt.includes('metáfora') || prompt.includes('analogía')) score += 2;
    if (prompt.split(' ').length > 20) score += 1;
    if (prompt.includes('estilo') || prompt.includes('tono')) score += 1;
  }

  if (criterion === 'especificidad') {
    const words = prompt.split(/\s+/).filter(Boolean);
    if (words.length > 30) score += 1;
    if (prompt.includes('ejemplo') || prompt.includes('específicamente')) score += 2;
    if (prompt.includes('formato') || prompt.includes('estructura')) score += 1;
    if (prompt.includes('paso') || prompt.includes('step')) score += 1;
  }

  if (criterion === 'simplicidad') {
    if (prompt.split(' ').every(w => w.length <= 10)) score += 2;
    if (!prompt.includes(' ') || prompt.split('.').length <= 3) score += 1;
    if (prompt.toLowerCase().includes('simple') || prompt.includes('fácil')) score += 1;
  }

  if (criterion === 'precisión científica' || criterion === 'precisión técnica') {
    if (prompt.length > 100) score += 1;
    if (prompt.includes('definir') || prompt.includes('explicar')) score += 2;
    if (prompt.includes('detalle') || prompt.includes('profundidad')) score += 1;
  }

  if (criterion === 'precisión') {
    if (prompt.length > 80) score += 1;
    if (prompt.includes('exactamente') || prompt.includes('precisamente')) score += 2;
  }

  if (criterion === 'estructura') {
    if (prompt.includes('\n') || prompt.includes('.')) score += 2;
    if (prompt.includes('1.') || prompt.includes('-')) score += 1;
  }

  if (criterion === 'detalle') {
    if (prompt.split(' ').length > 25) score += 1;
    if (prompt.includes('porque') || prompt.includes('ya que')) score += 2;
  }

  if (criterion === 'practicidad') {
    if (prompt.includes('receta') || prompt.includes('cocinar')) score += 2;
    if (prompt.includes('ingrediente') || prompt.includes('cantidad')) score += 2;
  }

  if (criterion === 'contexto cultural') {
    if (prompt.toLowerCase().includes('contexto') || prompt.includes('significado')) score += 2;
    if (prompt.includes('cultura') || prompt.includes('México') || prompt.includes('mexicano')) score += 2;
  }

  if (criterion === 'utilidad') {
    if (prompt.includes('solución') || prompt.includes('arreglar')) score += 2;
    if (prompt.includes('por qué') || prompt.includes('causa')) score += 2;
  }

  return Math.min(Math.max(score, 1), 10);
}

function generateFeedback(avg) {
  if (avg >= 8) return '¡Excelente prompt! Muy bien estructurado y claro.';
  if (avg >= 6) return 'Buen prompt, pero hay áreas que puedes mejorar.';
  if (avg >= 4) return 'Prompt aceptable. Intenta ser más específico y estructurado.';
  return 'El prompt necesita trabajo. Revisa las sugerencias de mejora.';
}

function generateStrengths(scores) {
  const strengths = [];
  for (const [criterion, score] of Object.entries(scores)) {
    if (score >= 7) strengths.push(`Buena ${criterion} (${score}/10)`);
  }
  if (strengths.length === 0) strengths.push('Escribe un prompt más detallado para mostrar tus fortalezas.');
  return strengths;
}

function generateImprovements(scores) {
  const improvements = [];
  for (const [criterion, score] of Object.entries(scores)) {
    if (score < 5) improvements.push(`Mejora tu ${criterion} (${score}/10). Intenta ser más específico.`);
  }
  if (improvements.length === 0) improvements.push('Sigue así, tu prompt está bien equilibrado.');
  return improvements;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { prompt } = req.body;

  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const result = evaluatePrompt(parseInt(id), prompt);

  if (result.error) {
    return res.status(404).json(result);
  }

  res.json(result);
};
