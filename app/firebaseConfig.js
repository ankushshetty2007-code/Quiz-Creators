
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "skilllab-2ccfd.firebaseapp.com",
  databaseURL: "https://skilllab-2ccfd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "skilllab-2ccfd",
  storageBucket: "skilllab-2ccfd.firebasestorage.app",
  messagingSenderId: "405930704547",
  appId: "1:405930704547:web:4a7543c4d064108aec8916"
};

const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

export const db = getDatabase(app);
