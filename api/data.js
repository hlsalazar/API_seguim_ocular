import { ref, get } from 'firebase/database';
import { db } from '../firebaseConfig.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const dataRef = ref(db, 'path/to/your/data');
      const snapshot = await get(dataRef);
      const data = snapshot.val();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
