// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Firestore
import { getAuth } from "firebase/auth";  // Firebase Authentication
import { getAnalytics } from "firebase/analytics";  // Optional, for Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEl4UJpyPpfjO7atXaYPooXE4WsT3IJn0",
  authDomain: "carecard-b86f3.firebaseapp.com",
  databaseURL: "https://carecard-b86f3-default-rtdb.firebaseio.com",
  projectId: "carecard-b86f3",
  storageBucket: "carecard-b86f3.firebasestorage.app",
  messagingSenderId: "809092318014",
  appId: "1:809092318014:web:13c5bd3744d603f65c226f",
  measurementId: "G-RCLQLVWE5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);  // Firestore initialization
const auth = getAuth(app);     // Authentication initialization

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Export db and auth to use in other parts of the app
export { db, auth };
