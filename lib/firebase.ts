import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDx1xtkhA62KKyHM9Y6dJWZOAbAaNHtLmk",
  authDomain: "front-talk.firebaseapp.com",
  projectId: "front-talk",
  storageBucket: "front-talk.firebasestorage.app",
  messagingSenderId: "630551432301",
  appId: "1:630551432301:web:1599d40acc689e539b8364"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);