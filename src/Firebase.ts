
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
  apiKey: "AIzaSyAVc2plpWbDW56cdi1iJVBfS2yxo8DtV-Y",
  authDomain: "linkedin-9548d.firebaseapp.com",
  projectId: "linkedin-9548d",
  storageBucket: "linkedin-9548d.appspot.com",
  messagingSenderId: "369670398625",
  appId: "1:369670398625:web:ccc6732792b853f18d86e0",
  measurementId: "G-CZ94075GGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {db,storage}