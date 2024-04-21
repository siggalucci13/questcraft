import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //console.log(req.body);
  if (req.method === 'POST') {
    const characterDescription = req.body['description'];
    console.log(characterDescription);
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

      try {
        const characterInfo = JSON.parse(infoResponse.choices[0].text.trim());
        res.status(200).json(characterInfo);
      } catch (parseError) {
        console.error('Error parsing character info:', parseError);
        res.status(500).json({ error: 'Failed to parse character info' });
      }
      console.log('OpenAI API response:', infoResponse.choices[0].text.trim());
    } catch (error) {
      console.error('Error generating character info:', error);
      res.status(500).json({ error: 'Failed to generate character info' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}