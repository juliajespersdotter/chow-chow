import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, orderBy, where } from 'firebase/firestore'
import { db } from '../firebase'

const useFilterFoodplaces = (options = {}) => {
	// const { currentUser } = useAuthContext()
	console.log(options)

	// create ref to collection 'foodplaces'
	const collectionRef = collection(db, 'foodplaces')

	// create queryKey
	// can redo this later to account for options to only show some foodplaces based on certain factors
	const queryKey = ['foodplaces']

	// create query for collectionRef, order result by name
	const queryRef = options.fetchUnApproved
		? query(collectionRef, where('approved', '==', false))
		: query(collectionRef)

	// run query
	const { data: foodplaces, isLoading } = useFirestoreQueryData(
		queryKey,
		queryRef,
		{
			idField: 'id',
			subscribe: true,
		}
	)

	return { foodplaces, isLoading }
}

export default useFilterFoodplaces
