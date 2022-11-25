import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, QueryConstraint } from 'firebase/firestore'
import { db } from '../firebase'

const useGetUsers = (...queryConstraint) => {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const colRef = collection(db, 'users')
		const queryRef = query(colRef, ...queryConstraint)

		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			const docs = snapshot.docs.map(doc => {
				return {
					...doc.data(),
				}
			})

			setUsers(docs)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return {
		users,
		loading,
	}
}

export default useGetUsers