// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyA9mAGkAI6GxsCETIQdeGJ-gxh3JGvPvpI",
  authDomain: "whatsapp-clone-8f985.firebaseapp.com",
  projectId: "whatsapp-clone-8f985",
  storageBucket: "whatsapp-clone-8f985.appspot.com",
  messagingSenderId: "770766449010",
  appId: "1:770766449010:web:72c83da7df0229c22c95eb",
  measurementId: "G-KXY6VXC2RC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
