import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyBYmzJSUnWjhkx8P9gsh9IqCnftHUFCY0U",
  authDomain: "sportslandingpage.firebaseapp.com",
  projectId: "sportslandingpage",
  storageBucket: "sportslandingpage.appspot.com",
  messagingSenderId: "79865547381",
  appId: "1:79865547381:web:dfe414cf804e8a75a9463c",
  measurementId: "G-WG2CRNMCSF"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { firestore, auth, storage }
