import { FirebaseError } from "firebase/app";

/** Thrown when a Firebase user signs in but is not listed in `super-admins`. */
export class NotAuthorizedError extends Error {
  constructor() {
    super("not-authorized");
    this.name = "NotAuthorizedError";
  }
}

const INVALID_CREDENTIALS = "Invalid credentials. Please try again.";

/** Maps Firebase Auth / Firestore errors to messages shown in the existing error box. */
export function getAuthErrorMessage(err: unknown): string {
  if (err instanceof NotAuthorizedError) {
    return "This account is not authorized to access the admin panel.";
  }
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
      case "auth/invalid-email":
        return INVALID_CREDENTIALS;
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      case "permission-denied":
        return "Unable to verify admin access. Please contact support.";
      default:
        return "Something went wrong. Please try again.";
    }
  }
  return "Something went wrong. Please try again.";
}

/** Same idea for the Forgot Password flow. */
export function getResetErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many requests. Please wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      default:
        return "Could not send the reset link. Please try again.";
    }
  }
  return "Could not send the reset link. Please try again.";
}
