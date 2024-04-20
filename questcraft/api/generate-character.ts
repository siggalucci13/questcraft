// pages/api/generate-character.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const generateCharacter = async (
  characterName: string,
  characterDescription: string
): Promise<string> => {
  // Replace this with your actual LLM API call
  const prompt = `Generate a character based on the following information:
  Name: ${characterName}
  Description: ${characterDescription}`;

  const response = await fetch('https://your-llm-api.com/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY',
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.generatedCharacter;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { characterName, characterDescription } = req.body;

    try {
      const generatedCharacter = await generateCharacter(characterName, characterDescription);
      res.status(200).json({ character: generatedCharacter });
    } catch (error) {
      console.error('Error generating character:', error);
      res.status(500).json({ error: 'Failed to generate character' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}