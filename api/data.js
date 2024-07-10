import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXj7QuX8r4aVvRbuOljxrY26kZLpP8KFM",
  authDomain: "registroocularuso.firebaseapp.com",
  databaseURL: "https://registroocularuso-default-rtdb.firebaseio.com",
  projectId: "registroocularuso",
  storageBucket: "registroocularuso.appspot.com",
  messagingSenderId: "230219267012",
  appId: "1:230219267012:web:7b8989887687bc16c78291",
  measurementId: "G-2FVK8VQHN4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const snapshot = await get(ref(db, 'arrayGuardar')); // Cambia este camino por el de tus datos en la base de datos
      const data = snapshot.val();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
