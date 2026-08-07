import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyDHHO2tsZJMSNv5lMebJ5kibsddGYpFECg",

  authDomain: "campusai-kapil.firebaseapp.com",

  projectId: "campusai-kapil",

  storageBucket: "campusai-kapil.firebasestorage.app",

  messagingSenderId: "790469603519",

  appId: "1:790469603519:web:b92cc0f0ec0ea4e5a5560a"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;