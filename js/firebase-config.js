import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBh1akNDFIdfi72IMSyy_BnM-PKqGxHAWQ",
  authDomain: "projeto-financas-f7604.firebaseapp.com",
  projectId: "projeto-financas-f7604",
  storageBucket: "projeto-financas-f7604.firebasestorage.app",
  messagingSenderId: "867509900405",
  appId: "1:867509900405:web:3b50339508141389c1543c",
  measurementId: "G-R1NFGN38P8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);