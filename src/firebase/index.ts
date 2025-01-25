import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { FirebaseConfig } from "../../config";
const firebaseConfig = {
  apiKey: "AIzaSyA5WPN0Nj0rLVc8fgIOuoazmT2zB_TxDxo",
  authDomain: "note-taking-web-app-e627a.firebaseapp.com",
  projectId: "note-taking-web-app-e627a",
  storageBucket: "note-taking-web-app-e627a.firebasestorage.app",
  messagingSenderId: "91053296827",
  appId: "1:91053296827:web:502b8186e787a05e87ad9e",
};

export const provider = new GoogleAuthProvider();

// Initialize Firebase
export const MainFirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(MainFirebaseApp);

// export const FirebaseFirestore = getFirestore(MainFirebaseApp);

