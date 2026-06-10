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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.json(challenges);
};
