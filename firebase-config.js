// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    // IMPORTANT: Replace with your actual Firebase configuration keys
    apiKey: "AIzaSyDNwzhOkQQLAQbkiNFTFEGSpWJdKaxbTRk",
    authDomain: "iryastone-uk.firebaseapp.com",
    projectId: "iryastone-uk",
    storageBucket: "iryastone-uk.firebasestorage.app",
    messagingSenderId: "110940910896",
    appId: "1:110940910896:web:b25e92127118665e5c84f5",
    measurementId: "G-6YM1FLYN48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ============================================
// AUTHENTICATION & USER MANAGEMENT FUNCTIONS
// ============================================

// Get current user ID
function getCurrentUserId() {
    const user = auth.currentUser;
    return user ? user.uid : null;
}

// Store user data in localStorage
function storeUserData(user) {
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL
    };
    localStorage.setItem('irya_stone_user', JSON.stringify(userData));
}

// Clear user data from localStorage
function clearUserData() {
    localStorage.removeItem('irya_stone_user');
    localStorage.removeItem('irya_stone_notifications');
    // Clear all specific user notification caches
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('irya_notifications_')) {
            localStorage.removeItem(key);
        }
    });
}

// User Registration
async function registerUser(email, password, additionalData = {}) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: additionalData.displayName || "",
            phone: additionalData.phone || "",
            newsletter: additionalData.newsletter || false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        // Store in localStorage
        storeUserData(user);

        return { success: true, user: user };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error: error.message };
    }
}

// User Login
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store in localStorage
        storeUserData(user);

        return { success: true, user: user };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: error.message };
    }
}

// Google Sign In
async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (!userDoc.exists()) {
            // Create new user document
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: user.displayName || "",
                phone: user.phoneNumber || "",
                photoURL: user.photoURL || "",
                googleSignIn: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        } else {
            // Update existing user
            await updateDoc(doc(db, "users", user.uid), {
                lastLogin: new Date().toISOString(),
                photoURL: user.photoURL || userDoc.data().photoURL,
                updatedAt: new Date().toISOString()
            });
        }

        // Store in localStorage
        storeUserData(user);

        return { success: true, user: user };
    } catch (error) {
        console.error("Google sign-in error:", error);
        return { success: false, error: error.message };
    }
}

// Sign Out
async function signOutUser() {
    try {
        await signOut(auth);
        clearUserData();
        return { success: true };
    } catch (error) {
        console.error("Sign out error:", error);
        return { success: false, error: error.message };
    }
}

// Reset Password
async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        console.error("Password reset error:", error);
        return { success: false, error: error.message };
    }
}

// Subscribe to Auth State Changes
function subscribeToAuth(callback) {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            storeUserData(user);
        } else {
            clearUserData();
        }
        callback(user);
    });
}

// Get user data
async function getUserData(userId) {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
            return { success: true, data: userDoc.data() };
        }
        return { success: false, error: "User not found" };
    } catch (error) {
        console.error("Get user data error:", error);
        return { success: false, error: error.message };
    }
}

// Check if user is admin
async function isUserAdmin(userId) {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.isAdmin === true;
        }
        return false;
    } catch (error) {
        console.error("Check admin error:", error);
        return false;
    }
}

// ============================================
// NOTIFICATION FUNCTIONS
// ============================================

// Update local notifications cache
async function updateLocalNotifications(userId) {
    // A simplified approach: clear cache to force fresh fetch next time
    try {
        localStorage.removeItem(`irya_notifications_${userId}`);
    } catch (error) {
        console.error("Update local cache error:", error);
    }
}

// Create notification for user
async function createNotification(userId, notificationData) {
    try {
        const notification = {
            ...notificationData,
            userId: userId,
            isRead: false,
            createdAt: new Date().toISOString(),
            readAt: null
        };

        const notificationsRef = collection(db, "users", userId, "notifications");
        const docRef = await addDoc(notificationsRef, notification);

        // Update local storage
        await updateLocalNotifications(userId);

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Create notification error:", error);
        return { success: false, error: error.message };
    }
}

// Get user notifications
async function getUserNotifications(userId, limitCount = 20) {
    try {
        // Check local storage first for cached notifications
        const cachedNotifications = localStorage.getItem(`irya_notifications_${userId}`);
        if (cachedNotifications) {
            const parsed = JSON.parse(cachedNotifications);
            // Return cached if less than 5 minutes old (300000 ms)
            if (parsed.timestamp && (Date.now() - parsed.timestamp < 300000)) {
                return { success: true, notifications: parsed.notifications };
            }
        }

        // Fetch from Firestore
        const notificationsRef = collection(db, "users", userId, "notifications");
        const q = query(notificationsRef, orderBy("createdAt", "desc"), limit(limitCount));
        const querySnapshot = await getDocs(q);

        const notifications = [];
        querySnapshot.forEach((doc) => {
            notifications.push({ id: doc.id, ...doc.data() });
        });

        // Cache in localStorage
        localStorage.setItem(`irya_notifications_${userId}`, JSON.stringify({
            notifications: notifications,
            timestamp: Date.now()
        }));

        return { success: true, notifications: notifications };
    } catch (error) {
        console.error("Get notifications error:", error);
        return { success: false, error: error.message };
    }
}

// Mark notification as read
async function markNotificationAsRead(userId, notificationId) {
    try {
        const notificationRef = doc(db, "users", userId, "notifications", notificationId);
        await updateDoc(notificationRef, {
            isRead: true,
            readAt: new Date().toISOString()
        });

        // Update local storage
        await updateLocalNotifications(userId);

        return { success: true };
    } catch (error) {
        console.error("Mark as read error:", error);
        return { success: false, error: error.message };
    }
}

// Mark all notifications as read
async function markAllNotificationsAsRead(userId) {
    try {
        // Fetch up to 50 notifications to process (adjust limit as needed)
        const notificationsResult = await getUserNotifications(userId, 50);
        if (!notificationsResult.success) return notificationsResult;

        const batchPromises = notificationsResult.notifications
            .filter(n => !n.isRead)
            // Use updateDoc directly for Firestore updates
            .map(n => updateDoc(doc(db, "users", userId, "notifications", n.id), {
                isRead: true,
                readAt: new Date().toISOString()
            }));

        await Promise.all(batchPromises);

        // Clear local cache to force reload with all read
        await updateLocalNotifications(userId);

        return { success: true };
    } catch (error) {
        console.error("Mark all as read error:", error);
        return { success: false, error: error.message };
    }
}

// Delete notification
async function deleteNotification(userId, notificationId) {
    try {
        await deleteDoc(doc(db, "users", userId, "notifications", notificationId));

        // Update local storage
        await updateLocalNotifications(userId);

        return { success: true };
    } catch (error) {
        console.error("Delete notification error:", error);
        return { success: false, error: error.message };
    }
}

// Get unread notification count
async function getUnreadNotificationCount(userId) {
    try {
        // Fetch a reasonable amount (100) to get an accurate count
        const notificationsResult = await getUserNotifications(userId, 100);
        if (!notificationsResult.success) return { success: false, error: notificationsResult.error };

        const unreadCount = notificationsResult.notifications.filter(n => !n.isRead).length;
        return { success: true, count: unreadCount };
    } catch (error) {
        console.error("Get unread count error:", error);
        return { success: false, error: error.message };
    }
}

// Send admin notification (for admin users)
async function sendAdminNotification(adminId, notificationData) {
    try {
        const notification = {
            ...notificationData,
            isAdmin: true, // Marker for admin notifications
            isRead: false,
            createdAt: new Date().toISOString()
        };

        const notificationsRef = collection(db, "users", adminId, "adminNotifications");
        const docRef = await addDoc(notificationsRef, notification);

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Send admin notification error:", error);
        return { success: false, error: error.message };
    }
}

// Function to create payment reminder notification
async function createPaymentReminderNotification(userId, orderData) {
    try {
        if (typeof orderData.remainingPayment !== 'number' || typeof orderData.orderNumber === 'undefined') {
             throw new Error("Invalid orderData provided for payment reminder.");
        }
        
        const notification = {
            title: '💰 Payment Reminder',
            message: `Remaining payment of £${orderData.remainingPayment.toFixed(2)} is due for order **${orderData.orderNumber}**. Please complete payment within 1 hour.`,
            orderId: orderData.id || null,
            orderNumber: orderData.orderNumber,
            userId: userId,
            type: 'payment_remaining_warning',
        };

        const result = await createNotification(userId, notification);
        return result.success;
    } catch (error) {
        console.error("❌ Error creating payment reminder:", error);
        return false;
    }
}

// Function to create order status notification
async function createOrderStatusNotification(userId, orderData, status, message) {
    try {
        if (typeof orderData.orderNumber === 'undefined' || typeof status !== 'string') {
             throw new Error("Invalid orderData or status provided for order status notification.");
        }
        
        const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
        const notification = {
            title: `📦 Order ${capitalizedStatus}`,
            message: message || `Your order **${orderData.orderNumber}** has been updated to **${capitalizedStatus}**.`,
            orderId: orderData.id || null,
            orderNumber: orderData.orderNumber,
            userId: userId,
            type: `order_${status.toLowerCase().replace(/\s/g, '_')}`,
        };

        const result = await createNotification(userId, notification);
        return result.success;
    } catch (error) {
        console.error("❌ Error creating order status notification:", error);
        return false;
    }
}


// Export all functions
export {
    app,
    auth,
    db,
    getCurrentUserId,
    registerUser,
    loginUser,
    signInWithGoogle,
    signOutUser,
    resetPassword,
    subscribeToAuth,

    // User Data Functions
    getUserData,
    isUserAdmin,

    // Notification functions
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    getUnreadNotificationCount,
    sendAdminNotification,
    createPaymentReminderNotification, // Exported new function
    createOrderStatusNotification     // Exported new function
};
