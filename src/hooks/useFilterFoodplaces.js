import { useFirestoreQueryData } from '@react-query-firebase/firestore'
<<<<<<< HEAD
import { collection, query, orderBy, where } from 'firebase/firestore'
import { db } from '../firebase'

const useFilterFoodplaces = (options = {}) => {
	// const { currentUser } = useAuthContext()
	console.log(options)
=======
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const useFoodplaces = () => {
	// const { currentUser } = useAuthContext()
>>>>>>> main

	// create ref to collection 'foodplaces'
	const collectionRef = collection(db, 'foodplaces')

	// create queryKey
	// can redo this later to account for options to only show some foodplaces based on certain factors
	const queryKey = ['foodplaces']

	// create query for collectionRef, order result by name
<<<<<<< HEAD
	const queryRef = options.fetchUnApproved
		? query(collectionRef, where('approved', '==', false))
		: query(collectionRef)
=======
	const queryRef = query(collectionRef, orderBy('name'))
>>>>>>> main

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

<<<<<<< HEAD
export default useFilterFoodplaces
=======
export default useFoodplaces
>>>>>>> main
