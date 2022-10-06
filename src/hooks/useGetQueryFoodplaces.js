import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../firebase'

const useGetQueryFoodplaces = () => {
	//collection ref from firestore
	const [queryKey, setQueryKey] = useState('')
	const [queryRef, setQueryRef] = useState('')

	const filterFoodplaces = (queryLimits = {}) => {
		let collectionRef = collection(db, 'foodplaces')
		if (
			queryLimits.fetchAll ||
			(queryLimits.type === 'All' &&
				queryLimits.cuisine === 'All' &&
				!queryLimits.city)
		) {
			setQueryKey(['foodplaces'])
			setQueryRef(query(collectionRef, where('approved', '==', true)))
			return
		}

		// when queryLimits change update the query
		setQueryKey(['foodplaces', queryLimits])
		let city = ''

		if (queryLimits.city) {
			city =
				queryLimits.city.charAt(0).toUpperCase() +
				queryLimits.city.slice(1)
			console.log(city)
		}

		// variable for keeping track of the diffrent constraints
		if (queryLimits.type !== 'All' && queryLimits.cuisine !== 'All') {
			if (city) {
				setQueryRef(
					query(
						collectionRef,
						where('approved', '==', true),
						where('cuisine', '==', `${queryLimits.cuisine}`),
						where('type', '==', `${queryLimits.type}`),
						where('city', '==', `${city}`)
					)
				)
			} else {
				setQueryRef(
					query(
						collectionRef,
						where('approved', '==', true),
						where('cuisine', '==', `${queryLimits.cuisine}`),
						where('type', '==', `${queryLimits.type}`)
					)
				)
			}
		}
		if (queryLimits.type === 'All' && queryLimits.cuisine !== 'All') {
			if (city) {
				setQueryRef(
					query(
						collectionRef,
						where('approved', '==', true),
						where('cuisine', '==', `${queryLimits.cuisine}`),
						where('city', '==', `${city}`)
					)
				)
			} else {
				setQueryRef(
					query(
						collectionRef,
						where('approved', '==', true),
						where('cuisine', '==', `${queryLimits.cuisine}`)
					)
				)
			}
		}
		if (queryLimits.cuisine === 'All' && queryLimits.type !== 'All') {
			if (city) {
				setQueryRef(
					query(
						collectionRef,
						where('approved', '==', true),
						where('type', '==', `${queryLimits.type}`),
						where('city', '==', `${city}`)
					)
				)
			} else {
				setQueryRef(
					query(
						collectionRef,
						where('approved', '==', true),
						where('type', '==', `${queryLimits.type}`)
					)
				)
			}
		}
		if (queryLimits.cuisine === 'All' && queryLimits.type === 'All') {
			if (city) {
				setQueryRef(
					query(
						collectionRef,
						where('approved', '==', true),
						where('city', '==', `${city}`)
					)
				)
			} else {
				setQueryRef(query(collectionRef, where('approved', '==', true)))
			}
		}
	}
	const {
		data: foodplaces,
		isLoading,
		isError,
		error,
	} = useFirestoreQueryData(queryKey, queryRef, {
		idField: 'id',
	})

	return { filterFoodplaces, foodplaces, isLoading, isError, error }
}

export default useGetQueryFoodplaces
