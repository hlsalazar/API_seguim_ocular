import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    const data = req.body;
    const jsonFilePath = path.join(process.cwd(), 'data', 'data.json');

    try {
      await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
