import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Map from '../components/Map'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useState, useEffect, useRef } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'
import Marker from '../components/Marker'
import useFoodplaces from '../hooks/useFoodplaces'

const MapPage = () => {
	const [zoom, setZoom] = useState(17) // initial zoom
	const { position, getLatLng, error, isError } = useGeoCoding()
	const [center, setCenter] = useState({
		lat: 55.58354,
		lng: 13.01373,
	})
	const [errorMsg, setErrorMsg] = useState(null)
	const addressRef = useRef()
	const { foodplaces, isLoading } = useFoodplaces()

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

	const onClick = foodplace => {
		// setModalVisible(true)
		console.log(foodplace)
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
			{isLoading && <p>Loading...</p>}
			<Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<div className='vh-75'>
					<Map center={center} zoom={zoom}>
						{foodplaces &&
							foodplaces.map(foodplace => (
								<Marker
									position={foodplace.geopoint}
									foodplace={foodplace}
									clickFunction={onClick}
									key={foodplace.id}
								/>
							))}
					</Map>
				</div>
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

export default MapPage
