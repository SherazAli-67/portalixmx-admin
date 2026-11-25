"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { NotAuthorizedError } from "@/lib/auth-errors";

/** Profile of a signed-in Super Admin (document `super-admins/{uid}`). */
export interface AdminProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
}

interface AuthContextValue {
  /** The signed-in Super Admin, or null when signed out / not authorized. */
  admin: AdminProfile | null;
  /** True until Firebase has reported the initial auth state. */
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Returns the admin profile if `super-admins/{uid}` exists, otherwise null.
 * The document is the single source of truth for "is this user a Super Admin".
 */
async function loadAdmin(user: User): Promise<AdminProfile | null> {
  // Ensure the Auth ID token is attached before Firestore evaluates rules.
  // Without this, getDoc can race and return permission-denied right after sign-in.
  const token = await user.getIdToken(true);
  if (!token) {
    throw new Error("missing-id-token");
  }

  try {
    const snap = await getDoc(doc(db, "super-admins", user.uid));
    if (!snap.exists()) {
      console.warn(
        `[auth] No super-admins/${user.uid} document. Create it in Firestore with this Auth UID as the document ID.`,
      );
      return null;
    }
    const data = snap.data();
    return {
      uid: user.uid,
      name: (data.name as string | undefined) || user.displayName || "Portalix Admin",
      email: (data.email as string | undefined) || user.email || "",
      photoURL: (data.photoURL as string | undefined) || user.photoURL || null,
    };
  } catch (err) {
    console.error("[auth] super-admins read failed", {
      uid: user.uid,
      projectId: db.app.options.projectId,
      authUid: auth.currentUser?.uid ?? null,
      err,
    });
    throw err;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAdmin(null);
        setLoading(false);
        return;
      }
      try {
        const profile = await loadAdmin(user);
        if (!profile) {
          // Signed in to Firebase (e.g. a Resident Admin) but not a Super Admin.
          await firebaseSignOut(auth);
        }
        setAdmin(profile);
      } catch {
        await firebaseSignOut(auth);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // Force a fresh token so Firestore rules see request.auth immediately.
    await cred.user.getIdToken(true);

    let profile: AdminProfile | null = null;
    try {
      profile = await loadAdmin(cred.user);
    } catch (err) {
      await firebaseSignOut(auth);
      throw err;
    }
    if (!profile) {
      await firebaseSignOut(auth);
      throw new NotAuthorizedError();
    }
    setAdmin(profile);
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
    setAdmin(null);
  }, []);

  const sendResetEmail = useCallback(async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  const value = useMemo(
    () => ({ admin, loading, signIn, signOut, sendResetEmail }),
    [admin, loading, signIn, signOut, sendResetEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
