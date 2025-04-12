import { initializeApp } from 'firebase/app';
import config from '../utils/config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

if (config.isDevelopment) {
}

const firebaseConfig = config.firebase;
console.log('firebaseConfig', config)
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


export default app;