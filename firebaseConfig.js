import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Tu configuración de Firebase
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

export { db };
