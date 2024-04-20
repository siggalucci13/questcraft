import {  OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { characterDescription } = req.body;
    try {
      const response = await openai.images.generate({
        prompt: characterDescription,
        n: 1,
        size: '512x512',
      });

      const imageUrl = response.data[0].url;

      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}