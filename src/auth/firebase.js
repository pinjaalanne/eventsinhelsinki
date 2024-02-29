// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "eventsinhelsinki-292a5.firebaseapp.com",
    projectId: "eventsinhelsinki-292a5",
    storageBucket: "eventsinhelsinki-292a5.appspot.com",
    messagingSenderId: "9660043005",
    appId: "1:9660043005:web:21d4eeb6e7c830607d7894"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Access the the project autehntication and database services
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

export const logout = () => {
    auth.signOut();
}

export { registerWithEmailAndPassword, auth, db };