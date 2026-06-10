const challenges = require('../../lib/challenges.json');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const challenge = challenges.find(c => c.id === parseInt(id));

  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  res.json(challenge);
};
