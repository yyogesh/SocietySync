import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { SignupFormData } from "../utils/schemas";
import { fileToBase64 } from "../utils/file";

export const userRegister = async (user: SignupFormData) => {
    try {
         // Create user in Firebase Auth
        const userCredintials = await createUserWithEmailAndPassword(auth, user.emailAddress, user.password);
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