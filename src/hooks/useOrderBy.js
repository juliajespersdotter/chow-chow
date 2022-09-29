import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, orderBy, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '../firebase'

const useOrderBy = value => {
	const getOrderedFoodplaces = (value, options = {}) => {
		// const { currentUser } = useAuthContext()
		console.log('value', value)

		// create ref to collection 'foodplaces'
		const collectionRef = collection(db, 'foodplaces')

		// create queryKey
		// can redo this later to account for options to only show some foodplaces based on certain factors
		const queryKey = ['foodplaces']

		// create query for collectionRef, order result by name
		const queryRef = query(collectionRef, orderBy(value))

		// run query
		const { data: orderedFoodplaces, isLoading } = useFirestoreQueryData(
			queryKey,
			queryRef,
			{
				idField: 'id',
				subscribe: true,
			}
		)
		return { orderedFoodplaces, isLoading }
	}
	useEffect(() => {
		if (value) {
			getOrderedFoodplaces(value)
		}
	}, [value])
}

export default useOrderBy
