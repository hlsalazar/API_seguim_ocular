import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const jsonFilePath = path.join(process.cwd(), 'data', 'data.json');

  try {
    const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
    const data = JSON.parse(jsonData);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
};
