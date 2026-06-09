const express = require('express');
const router = express.Router();
const challenges = require('../data/challenges.json');
const { evaluatePrompt } = require('../evaluators/promptEvaluator');

router.get('/', (req, res) => {
  res.json(challenges);
});

router.get('/:id', (req, res) => {
  const challenge = challenges.find(c => c.id === parseInt(req.params.id));
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
  res.json(challenge);
});

router.post('/:id/evaluate', (req, res) => {
  const { prompt } = req.body;
  if (!prompt || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  const result = evaluatePrompt(parseInt(req.params.id), prompt);
  if (result.error) return res.status(404).json(result);
  res.json(result);
});

module.exports = router;
