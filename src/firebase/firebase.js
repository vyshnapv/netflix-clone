
import { initializeApp } from "firebase/app";//it connect our app to firebase
import { getAuth } from "firebase/auth";//it enable login and sighnup
import { getFirestore } from "firebase/firestore";//it enable watchlist data

const firebaseConfig = {
  apiKey: "AIzaSyAfxJAfPlgL-I2R1i6OHVU5IudxOBH6Knk",
  authDomain: "netflix-clone-75a07.firebaseapp.com",
  projectId: "netflix-clone-75a07",
  storageBucket: "netflix-clone-75a07.firebasestorage.app",
  messagingSenderId: "548926390297",
  appId: "1:548926390297:web:8bb36487d870fe6c5faa88"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);