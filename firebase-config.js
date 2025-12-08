// ==============================================
// firebase-config.js - Complete Firebase Setup
// ==============================================

// Core Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

// Analytics (optional)
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";

// Authentication
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firestore Database
import { 
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  writeBatch,
  arrayUnion,
  arrayRemove,
  increment
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Storage
import { 
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

// ==============================================
// Firebase Configuration
// ==============================================
const firebaseConfig = {
  apiKey: "AIzaSyDNwzhOkQQLAQbkiNFTFEGSpWJdKaxbTRk",
  authDomain: "iryastone-uk.firebaseapp.com",
  projectId: "iryastone-uk",
  storageBucket: "iryastone-uk.firebasestorage.app",
  messagingSenderId: "110940910896",
  appId: "1:110940910896:web:b25e92127118665e5c84f5",
  measurementId: "G-6YM1FLYN48"
};

// ==============================================
// Initialize Firebase Services
// ==============================================
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ==============================================
// Firestore Collection References
// ==============================================
const collections = {
  users: () => collection(db, "users"),
  products: () => collection(db, "products"),
  categories: () => collection(db, "categories"),
  orders: () => collection(db, "orders"),
  cart: () => collection(db, "cart"),
  wishlist: () => collection(db, "wishlist"),
  addresses: () => collection(db, "addresses"),
  payments: () => collection(db, "payments"),
  shipping: () => collection(db, "shipping"),
  reviews: () => collection(db, "reviews"),
  settings: () => collection(db, "settings")
};

// ==============================================
// Storage Paths
// ==============================================
const storagePaths = {
  productImages: (productId, filename) => `products/${productId}/${filename}`,
  userAvatars: (userId) => `users/${userId}/avatar.jpg`,
  categoryImages: (categoryId) => `categories/${categoryId}.jpg`,
  orderDocuments: (orderId, filename) => `orders/${orderId}/${filename}`
};

// ==============================================
// Auth State Management
// ==============================================
let currentUser = null;
let authStateListeners = [];

// Watch auth state changes
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  
  // Notify all listeners
  authStateListeners.forEach(listener => {
    listener(user);
  });
  
  // Update UI if function exists
  if (typeof updateAuthUI === 'function') {
    updateAuthUI(user);
  }
});

// Subscribe to auth state changes
const subscribeToAuth = (callback) => {
  authStateListeners.push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = authStateListeners.indexOf(callback);
    if (index > -1) {
      authStateListeners.splice(index, 1);
    }
  };
};

// ==============================================
// Database Helper Functions
// ==============================================

// Get document data by ID
const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

// Add document to collection
const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

// Update document
const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Delete document
const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Query documents
const queryDocuments = async (collectionName, constraints = []) => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    
    return results;
  } catch (error) {
    console.error("Error querying documents:", error);
    throw error;
  }
};

// Listen to real-time updates
const listenToCollection = (collectionName, constraints, callback) => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      callback(results);
    }, (error) => {
      console.error("Error in real-time listener:", error);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up real-time listener:", error);
    throw error;
  }
};

// ==============================================
// User Management Functions
// ==============================================

// Register new user
const registerUser = async (email, password, userData) => {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile if name provided
    if (userData.displayName) {
      await updateProfile(user, {
        displayName: userData.displayName
      });
    }
    
    // Create user document in Firestore
    const userDoc = {
      uid: user.uid,
      email: user.email,
      displayName: userData.displayName || '',
      phone: userData.phone || '',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      role: 'customer',
      shippingAddress: null,
      billingAddress: null,
      preferences: {
        newsletter: true,
        marketing: false
      }
    };
    
    await setDoc(doc(db, "users", user.uid), userDoc);
    
    return user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update last login
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: serverTimestamp()
    });
    
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Google sign-in
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        role: 'customer',
        provider: 'google'
      };
      
      await setDoc(doc(db, "users", user.uid), userData);
    } else {
      // Update last login
      await updateDoc(doc(db, "users", user.uid), {
        lastLogin: serverTimestamp()
      });
    }
    
    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// Logout user
const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Update user profile
const updateUserProfile = async (userId, updates) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
};

// Get current user data
const getCurrentUserData = async () => {
  if (!currentUser) return null;
  
  try {
    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// ==============================================
// Product Management Functions
// ==============================================

// Get featured products
const getFeaturedProducts = async (limitCount = 6) => {
  try {
    const q = query(
      collections.products(),
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    return products;
  } catch (error) {
    console.error("Error getting featured products:", error);
    throw error;
  }
};

// Get products by category
const getProductsByCategory = async (category, limitCount = 12) => {
  try {
    const q = query(
      collections.products(),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    return products;
  } catch (error) {
    console.error("Error getting products by category:", error);
    throw error;
  }
};

// Get product by ID
const getProductById = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, "products", productId));
    
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
};

// ==============================================
// Cart Management Functions
// ==============================================

// Add to cart
const addToCart = async (productId, quantity = 1) => {
  if (!currentUser) {
    throw new Error("User must be logged in to add to cart");
  }
  
  try {
    const cartItem = {
      userId: currentUser.uid,
      productId: productId,
      quantity: quantity,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Check if item already exists in cart
    const q = query(
      collections.cart(),
      where("userId", "==", currentUser.uid),
      where("productId", "==", productId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Update existing item
      const existingDoc = querySnapshot.docs[0];
      const existingData = existingDoc.data();
      
      await updateDoc(doc(db, "cart", existingDoc.id), {
        quantity: existingData.quantity + quantity,
        updatedAt: serverTimestamp()
      });
      
      return { id: existingDoc.id, ...existingData, quantity: existingData.quantity + quantity };
    } else {
      // Add new item
      const docRef = await addDoc(collections.cart(), cartItem);
      return { id: docRef.id, ...cartItem };
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Get user's cart items
const getCartItems = async () => {
  if (!currentUser) return [];
  
  try {
    const q = query(
      collections.cart(),
      where("userId", "==", currentUser.uid),
      orderBy("addedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const cartItems = [];
    
    for (const cartDoc of querySnapshot.docs) {
      const cartItem = { id: cartDoc.id, ...cartDoc.data() };
      
      // Get product details
      try {
        const productDoc = await getDoc(doc(db, "products", cartItem.productId));
        if (productDoc.exists()) {
          cartItem.product = { id: productDoc.id, ...productDoc.data() };
        }
      } catch (error) {
        console.error("Error getting product details:", error);
      }
      
      cartItems.push(cartItem);
    }
    
    return cartItems;
  } catch (error) {
    console.error("Error getting cart items:", error);
    throw error;
  }
};

// Update cart item quantity
const updateCartItemQuantity = async (cartItemId, quantity) => {
  try {
    await updateDoc(doc(db, "cart", cartItemId), {
      quantity: quantity,
      updatedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};

// Remove from cart
const removeFromCart = async (cartItemId) => {
  try {
    await deleteDoc(doc(db, "cart", cartItemId));
    return true;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

// Clear cart
const clearCart = async () => {
  if (!currentUser) return false;
  
  try {
    const q = query(collections.cart(), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// ==============================================
// Order Management Functions
// ==============================================

// Create new order
const createOrder = async (orderData) => {
  if (!currentUser) {
    throw new Error("User must be logged in to create order");
  }
  
  try {
    const orderNumber = generateOrderNumber();
    
    const order = {
      orderNumber: orderNumber,
      userId: currentUser.uid,
      items: orderData.items,
      subtotal: orderData.subtotal,
      vat: orderData.vat,
      shipping: orderData.shipping,
      total: orderData.total,
      deposit: orderData.deposit,
      balance: orderData.balance,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress || orderData.shippingAddress,
      status: 'pending_payment',
      paymentMethod: null,
      depositPaid: false,
      balancePaid: false,
      notes: orderData.notes || '',
      estimatedDelivery: orderData.estimatedDelivery,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collections.orders(), order);
    return { id: docRef.id, ...order };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get user's orders
const getUserOrders = async () => {
  if (!currentUser) return [];
  
  try {
    const q = query(
      collections.orders(),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
};

// Update order status
const updateOrderStatus = async (orderId, status, updates = {}) => {
  try {
    await updateDoc(doc(db, "orders", orderId), {
      status: status,
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// ==============================================
// Storage Functions
// ==============================================

// Upload image to storage
const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          // Progress tracking
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          // Upload complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Upload product image
const uploadProductImage = async (productId, file) => {
  const filename = `${Date.now()}_${file.name}`;
  const path = storagePaths.productImages(productId, filename);
  return uploadImage(file, path);
};

// ==============================================
// Utility Functions
// ==============================================

// Generate order number
const generateOrderNumber = () => {
  const prefix = 'STONE';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

// Calculate VAT (20% UK VAT)
const calculateVAT = (amount) => {
  return parseFloat((amount * 0.20).toFixed(2));
};

// Calculate deposit (30%)
const calculateDeposit = (total) => {
  return parseFloat((total * 0.30).toFixed(2));
};

// Calculate balance (70%)
const calculateBalance = (total) => {
  return parseFloat((total * 0.70).toFixed(2));
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
};

// ==============================================
// Export Everything
// ==============================================
export {
  // Firebase services
  app,
  analytics,
  auth,
  db,
  storage,
  
  // Collections
  collections,
  storagePaths,
  
  // Auth
  currentUser,
  subscribeToAuth,
  registerUser,
  loginUser,
  signInWithGoogle,
  logoutUser,
  updateUserProfile,
  getCurrentUserData,
  sendPasswordResetEmail,
  
  // Database helpers
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
  listenToCollection,
  
  // Products
  getFeaturedProducts,
  getProductsByCategory,
  getProductById,
  
  // Cart
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  
  // Orders
  createOrder,
  getUserOrders,
  updateOrderStatus,
  
  // Storage
  uploadImage,
  uploadProductImage,
  
  // Utilities
  generateOrderNumber,
  calculateVAT,
  calculateDeposit,
  calculateBalance,
  formatCurrency,
  
  // Firestore functions
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
  writeBatch,
  arrayUnion,
  arrayRemove,
  increment
};
