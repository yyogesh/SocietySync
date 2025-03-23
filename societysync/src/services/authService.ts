import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export const userRegister = async (userData: any) => {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.emailAddress, userData.password);
    const user = userCredential.user;

    const userDocRef = doc(db, 'users', user.uid)

    const userDocData = {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        role: userData.role,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await setDoc(userDocRef, userDocData)
}