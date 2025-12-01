// firebase-config.js - COMPLETE UPDATED VERSION
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

// Firestore - ✅ ALL NECESSARY FUNCTIONS INCLUDED
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,        // ✅ ADDED: For getting single document
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  where,
  serverTimestamp,
  onSnapshot,
  limit          // ✅ ADDED: For limiting query results
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Storage
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyDxNMhU09mINvq_aDLtylBg3FucCK-MzYE",
  authDomain: "sandstonebijoliya-293d2.firebaseapp.com",
  projectId: "sandstonebijoliya-293d2",
  storageBucket: "sandstonebijoliya-293d2.appspot.com",
  messagingSenderId: "133756247845",
  appId: "1:133756247845:web:8e769ce2af3db1765484cc",
  measurementId: "G-H7JMX9VNYF"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// ===== Export =====
export {
  app,
  db,
  auth,
  storage,
  googleProvider,
  // Firestore functions
  collection,
  addDoc,
  getDocs,
  getDoc,          // ✅ EXPORTED
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  where,
  serverTimestamp,
  onSnapshot,
  limit,           // ✅ EXPORTED
  // Auth functions
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  // Storage functions
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL
};
