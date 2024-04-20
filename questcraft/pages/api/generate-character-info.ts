import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI} from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { characterDescription } = req.body;

    try {
      // Generate character info
      const infoPrompt = `Given the following character description, please provide the character's name, height, skills, and race in a JSON format:

Character Description: ${characterDescription}

{
  "name": "",
  "height": "",
  "skills": "",
  "race": ""
}`;

      const infoResponse = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: infoPrompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.8,
      });

      const characterInfo = JSON.parse(infoResponse.choices[0].text.trim());

      // Generate background image
      const imagePrompt = `Generate a background image of an environment based on the following description, do not include the character:

${characterDescription}`;

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