import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const useFoodplaces = () => {
	// const { currentUser } = useAuthContext()

	// create ref to collection 'foodplaces'
	const collectionRef = collection(db, 'foodplaces')

	// create queryKey
	// can redo this later to account for options to only show some foodplaces based on certain factors
	const queryKey = ['foodplaces']

	// create query for collectionRef, order result by name
	const queryRef = query(collectionRef, orderBy('name'))

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

export default useFoodplaces