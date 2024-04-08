import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import{getAuth, onAuthStateChanged,GoogleAuthProvider,signInWithPopup,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import{getFirestore, collection, addDoc, onSnapshot, where, query, doc,orderBy,setDoc,updateDoc   } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import {getDatabase,ref, set,onValue,child, get,update,remove   } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyD68kzIw8vC4hy2iqR6NRrPw6qHN9Xhb0o",
  authDomain: "g-a9e04.firebaseapp.com",
  databaseURL: "https://g-a9e04-default-rtdb.firebaseio.com",
  projectId: "g-a9e04",
  storageBucket: "g-a9e04.appspot.com",
  messagingSenderId: "542743360102",
  appId: "1:542743360102:web:fd9595b60cfb9b5c99f3a7",
  measurementId: "G-4PP141JSLL"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'it';
const db = getFirestore(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();


export{onAuthStateChanged};
export{signInWithPopup};
export{collection};
export{addDoc};
export{onSnapshot};
export{updateDoc};
export{query};
export{where};
export{doc};
export{GoogleAuthProvider};
export{orderBy};
export{signOut};
export{getDatabase};
export{ref};
export{set};
export{onValue};
export{child};
export{get};
export{setDoc};
export{update};
export{createUserWithEmailAndPassword};
export{signInWithEmailAndPassword};
export{getAuth};
export{updateProfile};
export{remove}
export{auth};
export{provider};
export{db};
export{database};
