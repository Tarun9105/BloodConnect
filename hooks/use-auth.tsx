"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

type UserRole = "donor" | "acceptor" | "admin"

interface UserData {
  uid: string
  email: string | null
  displayName: string | null
  role: UserRole
  photoURL?: string | null
  phoneNumber?: string | null
  createdAt?: Date
  lastLogin?: Date
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, userData: Partial<UserData>) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)

      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid)
          const userDoc = await getDoc(userDocRef)

          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData)
          }
        } catch (err) {
          console.error("Error fetching user data:", err)
        }
      } else {
        setUserData(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData: Partial<UserData>) => {
    try {
      setError(null)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      if (userData.displayName) {
        await updateProfile(user, { displayName: userData.displayName })
      }

      // Create user document in Firestore
      const userDocRef = doc(db, "users", user.uid)
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName || null,
        role: userData.role || "donor",
        phoneNumber: userData.phoneNumber || null,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        ...userData,
      })
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      await signInWithEmailAndPassword(auth, email, password)

      if (user) {
        // Update last login time
        const userDocRef = doc(db, "users", user.uid)
        await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true })
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      await firebaseSignOut(auth)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        error,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

