// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNarYX2diEFv_1M-uv7IOdPvl1m_CZdkA",
  authDomain: "fit5032-lab7-78c0a.firebaseapp.com",
  projectId: "fit5032-lab7-78c0a",
  storageBucket: "fit5032-lab7-78c0a.firebasestorage.app",
  messagingSenderId: "8972728571",
  appId: "1:8972728571:web:86c1ebb8b174034acd585e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
export default db; 