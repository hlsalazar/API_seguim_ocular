import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async (req, res) => {
  // Configuración de CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Cambia '*' por dominios específicos si necesario
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Pre-flight request handling
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, 'arrayGuardar'));
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).send('No data available');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
