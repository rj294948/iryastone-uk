// ============================================
// ENVIRONMENT CONFIGURATION LOADER
// ============================================
// This file loads environment variables securely

const ENV = {
    // Firebase Configuration
    FIREBASE_API_KEY: window.VITE_FIREBASE_API_KEY || "",
    FIREBASE_AUTH_DOMAIN: window.VITE_FIREBASE_AUTH_DOMAIN || "",
    FIREBASE_PROJECT_ID: window.VITE_FIREBASE_PROJECT_ID || "",
    FIREBASE_STORAGE_BUCKET: window.VITE_FIREBASE_STORAGE_BUCKET || "",
    FIREBASE_MESSAGING_SENDER_ID: window.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    FIREBASE_APP_ID: window.VITE_FIREBASE_APP_ID || "",
    FIREBASE_MEASUREMENT_ID: window.VITE_FIREBASE_MEASUREMENT_ID || "",
    
    // Company Details
    COMPANY_NAME: window.COMPANY_NAME || "",
    COMPANY_PHONE: window.COMPANY_PHONE || "",
    COMPANY_WHATSAPP: window.COMPANY_WHATSAPP || "",
    COMPANY_EMAIL: window.COMPANY_EMAIL || "",
    COMPANY_ADDRESS: window.COMPANY_ADDRESS || ""
};

// Export for use in other files
window.ENV = ENV;
