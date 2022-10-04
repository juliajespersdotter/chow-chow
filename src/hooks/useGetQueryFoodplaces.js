import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../firebase'

const useGetQueryFoodplaces = () => {
	//collection ref from firestore
	const [queryKey, setQueryKey] = useState('')
	const [queryRef, setQueryRef] = useState('')

	const filterFoodplaces = (queryLimits = {}) => {
		let collectionRef = collection(db, 'foodplaces')
		if (
			queryLimits.fetchAll ||
			(queryLimits.type === 'All' && queryLimits.cuisine === 'All')
		) {
			console.log('asdsad')
			setQueryKey(['foodplaces'])
			setQueryRef(query(collectionRef, where('approved', '==', true)))
			return
		}

		console.log('foodplaces', foodplaces)

		// when queryLimits change update the query
		setQueryKey(['foodplaces', queryLimits])

		// variable for keeping track of the diffrent constraints
		if (queryLimits.type !== 'All' && queryLimits.cuisine !== 'All') {
			setQueryRef(
				query(
					collectionRef,
					where('type', '==', `${queryLimits.type}`),
					where(
						'cuisine',
						'array-contains',
						`${queryLimits.cuisine}`
					),
					where('approved', '==', true)
				)
			)
		}
		if (queryLimits.type === 'All' && queryLimits.cuisine !== 'All') {
			setQueryRef(
				query(
					collectionRef,
					where('approved', '==', true),
					where('cuisine', 'array-contains', `${queryLimits.cuisine}`)
				)
			)
		}
		if (queryLimits.cuisine === 'All' && queryLimits.type !== 'All') {
			setQueryRef(
				query(
					collectionRef,
					where('approved', '==', true),
					where('type', '==', `${queryLimits.type}`)
				)
			)
		}
	}
	const { data: foodplaces, isLoading } = useFirestoreQueryData(
		queryKey,
		queryRef,
		{
			idField: 'id',
		}
	)

	return { filterFoodplaces, foodplaces, isLoading }
}

export default useGetQueryFoodplaces
