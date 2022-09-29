import { useState, useEffect } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const useStreamCollection = (col, ...queryConstraint) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const colRef = collection(db, col)
        const queryRef = query(colRef, ...queryConstraint)

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const docs = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setData(docs)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    return { data, isLoading }
}

export default useStreamCollection