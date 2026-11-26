import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import {
  initializeAppCheck,
  getToken,
  ReCaptchaEnterpriseProvider,
  type AppCheck,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function assertFirebaseConfig() {
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing Firebase env vars: ${missing.join(", ")}. Check .env.local.`,
    );
  }
}

function createFirebaseApp(): FirebaseApp {
  assertFirebaseConfig();
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

const app = createFirebaseApp();

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

declare global {
  // Firebase reads this before initializeAppCheck in local/dev builds.
  // eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: string | boolean | undefined;
}

let appCheck: AppCheck | null = null;
let appCheckReady: Promise<AppCheck | null> | null = null;

/**
 * Initializes App Check with reCAPTCHA Enterprise and waits for a token.
 * Safe to call multiple times; no-ops on the server.
 */
export function ensureAppCheck(): Promise<AppCheck | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (appCheckReady) return appCheckReady;

  appCheckReady = (async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      throw new Error(
        "Missing RECAPTCHA_SITE_KEY. Add it to .env.local and restart the dev server.",
      );
    }

    // Debug provider for localhost / local browsers. Register the token in
    // Firebase Console → App Check → Manage debug tokens.
    if (process.env.NODE_ENV === "development") {
      const debugToken = process.env.NEXT_PUBLIC_DEBUG_TOKEN;
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken || true;
    }

    if (!appCheck) {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    }

    await getToken(appCheck, /* forceRefresh */ false);
    return appCheck;
  })();

  return appCheckReady;
}

export default app;
