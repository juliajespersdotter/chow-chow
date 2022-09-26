import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { auth, storage } from '../firebase'
import SyncLoader from 'react-spinners/SyncLoader'

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

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
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

	const setDisplayNameAndPhoto = async (displayName, photo) => {
		let photoURL = auth.currentUser.photoURL

		if (photo) {
			// create a reference to upload the file to
			const fileRef = ref(
				storage,
				`photos/${auth.currentUser.email}/${photo.name}`
			)

			try {
				// upload photo to fileRef
				const uploadResult = await uploadBytes(fileRef, photo)

				// get download url to uploaded file
				photoURL = await getDownloadURL(uploadResult.ref)

				console.log(
					'Photo uploaded successfully, download url is:',
					photoURL
				)
			} catch (e) {
				console.log('Upload failed', e)
				setError('Photo failed to upload!')
			}
		}

		return updateProfile(auth.currentUser, {
			displayName,
			photoURL,
		})
	}

	// add auth-state observer here (somehow... 😈)
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
		logout,
		signup,
		reloadUser,
		resetPassword,
		setDisplayNameAndPhoto,
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
					<SyncLoader
						color={'#888'}
						size={15}
						speedMultiplier={1.1}
					/>
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}

export { AuthContextProvider as default, useAuthContext }
