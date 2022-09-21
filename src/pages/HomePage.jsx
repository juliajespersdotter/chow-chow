import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Map from '../components/Map'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useState, useEffect, useRef } from 'react'
import { collection, orderBy, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import useGeoCoding from '../hooks/useGeoCoding'
import Marker from '../components/Marker'

const HomePage = () => {
	const [zoom, setZoom] = useState(17) // initial zoom
	const { position, getLatLng, error, isError } = useGeoCoding()
	const [center, setCenter] = useState({
		lat: 55.58354,
		lng: 13.01373,
	})
	const [errorMsg, setErrorMsg] = useState(null)
	const addressRef = useRef()

	const foodplaceRef = collection(db, 'foodplaces')

	const queryRef = query(foodplaceRef, orderBy('name'))
	const { data: foodplaces, isLoading } = useFirestoreQueryData(
		['foodplaces'],
		queryRef,
		{
			idField: 'id',
			subscribe: true,
		}
	)

	const handleSubmit = async e => {
		e.preventDefault()

		if (addressRef.current.value) {
			try {
				await getLatLng(addressRef.current.value)
			} catch (err) {
				setErrorMsg(err.message)
				console.log(errorMsg)
			}
		}
	}

	useEffect(() => {
		if (position.lat && position.lng) {
			setCenter({ lat: position.lat, lng: position.lng })
		}
	}, [position])

	return (
		<Container fluid className='m-0 p-0'>
			{isError && (
				<Alert variant='danger'>An error has occurred: {error}</Alert>
			)}
			<Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<Map
					center={center}
					zoom={zoom}
					style={{
						flexGrow: '1',
						height: '90vh',
						width: '100vw',
						position: 'relative',
					}}
				>
					{foodplaces &&
						foodplaces.map(foodplace => (
							<Marker
								position={foodplace.geopoint}
								key={foodplace.id}
							/>
						))}
				</Map>
			</Wrapper>
			<form onSubmit={handleSubmit}>
				<input
					type='string'
					id='address'
					name='address'
					ref={addressRef}
				/>
				<button type='submit'>submit</button>
			</form>
			{/* {form} */}
		</Container>
	)
}

export default HomePage
