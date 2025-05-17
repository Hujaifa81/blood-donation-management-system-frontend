import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { useAxios } from '../hooks/useAxios';

import axios from 'axios';

 export const AuthContext=createContext(null)
export const AuthProvider = ({children}) => {
 
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const axiosPublic=useAxios()
    // const axiosPrivate=useAxiosSecure()

    const goggleProvider = new GoogleAuthProvider();

    const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth, goggleProvider)
    }
    const emailRegister=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const emailSignIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }
    const logOut=()=>{
       setLoading(true)
       return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
          if (currentUser) {
            
             setUser(currentUser);
           
          } else {
            axios.post(`${import.meta.env.VITE_baseURL}/logout`, {}, { withCredentials: true });
            setUser(null);
          }
          setLoading(false);
        });
        return () => unsubscribe();
      }, [axiosPublic]);
      
    const value={
        googleSignIn,
        emailSignIn,
        user,
        emailRegister,
        updateUserProfile,
        loading,
        logOut
    }
    return (
        <div>
            <AuthContext.Provider value={value}>
            {
                children
            }
            </AuthContext.Provider>
            
        </div>
    );
};

export default AuthProvider;