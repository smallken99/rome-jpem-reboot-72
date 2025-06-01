// firebase-config.js
import { initializeApp } from "firebase/app";
// 如果需要使用其他 Firebase 服務，也需要引入對應的模組，例如：
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPYO8BZxFu1VZkwRiSfWj87TqrO4naA8U",
  authDomain: "my-auth-app-eb189.firebaseapp.com",
  projectId: "my-auth-app-eb189",
  storageBucket: "my-auth-app-eb189.firebasestorage.app",
  messagingSenderId: "897004547397",
  appId: "1:897004547397:web:7a92e560c3a79ce7ad222c",
  measurementId: "G-YRVZFBEMEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the app instance and other services you need
// export const auth = getAuth(app);
// export const db = getFirestore(app);

export { app };
