import { createContext, useContext, useEffect, useState } from 'react'
import {
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateEmail,
	updatePassword,
} from 'firebase/auth'
import { auth } from '../firebase'
import LoadingSpinner from '../components/LoadingSpinner'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userName, setUserName] = useState(null)
	const [userEmail, setUserEmail] = useState(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState(null)
	const [loading, setLoading] = useState(true)

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		setUserPhotoUrl(auth.currentUser.photoURL)
		return true
	}

	const resetPassword = email => {
		return sendPasswordResetEmail(auth, email)
	}

	const setEmail = email => {
		return updateEmail(currentUser, email)
	}

	const setPassword = newPassword => {
		return updatePassword(currentUser, newPassword)
	}

	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			setUserName(user?.displayName)
			setUserEmail(user?.email)
			setUserPhotoUrl(user?.photoURL)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		// here be everything the children needs/should be able to use
		currentUser,
		login,
		reloadUser,
		resetPassword,
		setEmail,
		setPassword,
		userName,
		userEmail,
		userPhotoUrl,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading ? (
				<div id='initial-loader'>
					<LoadingSpinner />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}

export { AuthContextProvider as default, useAuthContext }
