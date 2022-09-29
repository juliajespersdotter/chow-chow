import { useState, useEffect } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const useStreamCollection = (collectionName, options = {}) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const collectionRef = collection(db, collectionName)
        const queryRef = query(collectionRef)
        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setData(data)
            setIsLoading(false)
        })
        return unsubscribe
    }, [collectionName])

    return { data, isLoading }
}

export default useStreamCollection