import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { characterDescription } = req.body;

    try {
      // Generate character info
      const infoPrompt = `Given the following character description, please provide the character's name, race, class, level, armor class, hit points, speed, strength, dexterity, constitution, intelligence, wisdom, and charisma in a JSON format:

Character Description: ${characterDescription}

{
  "name": "",
  "race": "",
  "class": "",
  "level": 0,
  "armorClass": 0,
  "hitPoints": 0,
  "speed": 0,
  "strength": 0,
  "dexterity": 0,
  "constitution": 0,
  "intelligence": 0,
  "wisdom": 0,
  "charisma": 0
}`;

      const infoResponse = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: infoPrompt,
        max_tokens: 300,
        n: 1,
        stop: null,
        temperature: 0.8,
      });

      const characterInfo = JSON.parse(infoResponse.choices[0].text.trim());

      // Generate background image
      const imagePrompt = `Generate a background image of an environment that the character would live in. Here is the description of the character: ${characterDescription}`;

      const imageResponse = await openai.images.generate({
        prompt: imagePrompt,
        n: 1,
        size: '512x512',
      });

      const backgroundImage = imageResponse.data[0].url;

      res.status(200).json({ ...characterInfo, backgroundImage });
    } catch (error) {
      console.error('Error generating character info and background image:', error);
      res.status(500).json({ error: 'Failed to generate character info and background image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}