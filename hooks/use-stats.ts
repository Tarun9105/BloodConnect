import { useState, useEffect } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Stats {
  registeredDonors: number
  successfulDonations: number
  livesSaved: number
  partnerHospitals: number
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    registeredDonors: 0,
    successfulDonations: 0,
    livesSaved: 0,
    partnerHospitals: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    // Set up real-time listeners for each collection
    const donorsQuery = query(collection(db, "users"), where("role", "==", "donor"))
    const donationsQuery = query(collection(db, "donations"), where("status", "==", "completed"))
    const hospitalsQuery = query(collection(db, "hospitals"))

    // Listen for donors changes
    const donorsUnsubscribe = onSnapshot(
      donorsQuery,
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          registeredDonors: snapshot.size,
        }))
      },
      (err) => {
        console.error("Error listening to donors:", err)
        setError("Failed to fetch donors data")
      }
    )

    // Listen for donations changes
    const donationsUnsubscribe = onSnapshot(
      donationsQuery,
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          successfulDonations: snapshot.size,
          livesSaved: snapshot.size * 3, // Assuming each donation can save up to 3 lives
        }))
      },
      (err) => {
        console.error("Error listening to donations:", err)
        setError("Failed to fetch donations data")
      }
    )

    // Listen for hospitals changes
    const hospitalsUnsubscribe = onSnapshot(
      hospitalsQuery,
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          partnerHospitals: snapshot.size,
        }))
      },
      (err) => {
        console.error("Error listening to hospitals:", err)
        setError("Failed to fetch hospitals data")
      }
    )

    // Set loading to false after initial data is received
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Give a small delay to ensure we have data

    // Cleanup function to unsubscribe from all listeners
    return () => {
      donorsUnsubscribe()
      donationsUnsubscribe()
      hospitalsUnsubscribe()
      clearTimeout(timeoutId)
    }
  }, []) // Empty dependency array means this effect runs once on mount

  return { stats, isLoading, error }
} 