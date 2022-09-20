import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Map from '../components/Map'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useState, useEffect, useRef } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'

const HomePage = () => {
	const [zoom, setZoom] = useState(17) // initial zoom
	const [address, setAddress] = useState('rasmusgatan 2a')
	const { position, getLatLng, error, isError } = useGeoCoding(address)
	const [center, setCenter] = useState({
		lat: 55.58354,
		lng: 13.01373,
	})
	const [errorMsg, setErrorMsg] = useState(null)
	const addressRef = useRef()

	const handleSubmit = async e => {
		e.preventDefault()

		if (addressRef.current.value) {
			setAddress(addressRef.current.value)
		}
		try {
			await getLatLng(address)
		} catch (err) {
			setErrorMsg(err.message)
			console.log(errorMsg)
		}
	}

	useEffect(() => {
		const awaitSetCenter = async () => {
			if (position.lat && position.lng) {
				setCenter({ lat: position.lat, lng: position.lng })
			}
		}

		awaitSetCenter()
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
				/>
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
