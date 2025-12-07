import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.init";

export const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    // Sign up
    const signUpWithEmailAndPassword = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if(result) {
                console.log("Response of firebase", result)
            }
            return result
        }
        catch (err) {
            console.log(err);
        }
    }

    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            if(result) console.log(result)
            return result;
        }
        catch(err) {
            console.log(err)
        }
    }

    const value = {loading, user, signUpWithEmailAndPassword, login};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}