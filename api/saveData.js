// api/saveData.js

const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;
    const filePath = path.join(process.cwd(), 'data', 'data.json');

    fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ message: 'Error writing file' });
      }
      console.log('File has been saved.');
      res.status(200).json({ message: 'File has been saved' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
