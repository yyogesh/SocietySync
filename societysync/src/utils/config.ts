// Environment configuration
interface EnvironmentConfig {
    env: string
    apiUrl: string
    firebase: {
      apiKey: string
      authDomain: string
      projectId: string
      storageBucket: string
      messagingSenderId: string
      appId: string
      measurementId?: string
    }
    appName: string
    appVersion: string
    isDevelopment: boolean
    isStaging: boolean
    isProduction: boolean
  }

  const config: EnvironmentConfig = {
    env: import.meta.env.VITE_APP_ENV || "development",
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8080",
    firebase: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    },
    appName: import.meta.env.VITE_APP_NAME || "Society Management System",
    appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
    isDevelopment: import.meta.env.VITE_APP_ENV === "development",
    isStaging: import.meta.env.VITE_APP_ENV === "staging",
    isProduction: import.meta.env.VITE_APP_ENV === "production",
  }
  
  export default config