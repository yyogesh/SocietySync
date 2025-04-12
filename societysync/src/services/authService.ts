import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { SignupFormData } from "../utils/schemas";
import { fileToBase64 } from "../utils/file";
import { LoginCredentials, PasswordChangeData, PasswordResetData, User } from "../types/auth.types";

export const userRegister = async (user: Partial<SignupFormData>) => {
  try {
    // Create user in Firebase Auth
    const userCredintials = await createUserWithEmailAndPassword(auth, user.email || '', user.password || '');
    const authUser = userCredintials.user;

    const profilePicture = 'test';//await fileToBase64(user.profilePicture);
    const userDocRef = doc(db, "users", authUser.uid);
    const userData = {
      ...user,
      profilePicture,
      uid: authUser.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await setDoc(userDocRef, userData);

    return userData;

  } catch (error: any) {
    throw new Error(error.message || "Failed to register")
  }
}

/**
 * Login a user with email and password
 */
export const login = async ({ email, password }: LoginCredentials): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

    if (userDoc.exists()) {
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...userDoc.data(),
      } as User
    } else {
      throw new Error("User data not found")
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to login")
  }
}



/**
 * Logout the current user
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error(error.message || "Failed to logout")
  }
}

/**
 * Send password reset email
 */
export const resetPassword = async ({ email }: PasswordResetData): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw new Error(error.message || "Failed to send password reset email")
  }
}

/**
 * Change user password
 */
export const changePassword = async ({ currentPassword, newPassword }: PasswordChangeData): Promise<void> => {
  try {
    const user = auth.currentUser

    if (!user || !user.email) {
      throw new Error("No authenticated user")
    }

    // Re-authenticate user before changing password
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // Change password
    await updatePassword(user, newPassword)
  } catch (error: any) {
    throw new Error(error.message || "Failed to change password")
  }
}

/**
 * Get current authenticated user data
 */
export const getCurrentUser = async (firebaseUser: FirebaseUser): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))

    if (userDoc.exists()) {
      const userData = userDoc.data()
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        ...userData,
        createdAt: userData.createdAt?.toDate() || new Date(),
        updatedAt: userData.updatedAt?.toDate() || new Date(),
      } as User
    }

    return null
  } catch (error: any) {
    throw new Error(error.message || "Failed to get current user")
  }
}



/**
 * Update current user's profile
 */
export const updateUserProfile = async (userData: SignupFormData): Promise<User> => {
  try {
    const currentUser = auth.currentUser

    if (!currentUser) {
      throw new Error("No authenticated user")
    }

    // Update in Firebase Auth if displayName is provided
    // if (userData.displayName || userData.photoURL) {
    //   await updateProfile(currentUser, {
    //     displayName: userData.displayName || currentUser.displayName,
    //     photoURL: userData.photoURL || currentUser.photoURL,
    //   })
    // }

    // Update in Firestore
    const userRef = doc(db, "users", currentUser.uid)
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    })

    // Get the updated user data
    const updatedUserDoc = await getDoc(userRef)

    if (!updatedUserDoc.exists()) {
      throw new Error("User not found")
    }

    const updatedUserData = updatedUserDoc.data()

    return {
      uid: currentUser.uid,
      email: currentUser.email,
      ...updatedUserData,
      createdAt: updatedUserData.createdAt?.toDate() || new Date(),
      updatedAt: updatedUserData.updatedAt?.toDate() || new Date(),
    } as User
  } catch (error: any) {
    throw new Error(error.message || "Failed to update profile")
  }
}