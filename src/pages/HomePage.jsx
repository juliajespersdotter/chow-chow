import Container from 'react-bootstrap/Container'
import Map from '../components/Map'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useState, useEffect } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'

const HomePage = () => {
	const [clicks, setClicks] = useState([])
	const [zoom, setZoom] = useState(17) // initial zoom
	const [center, setCenter] = useState({
		lat: 55.58354,
		lng: 13.01373,
	})
	const [adress, setAdress] = useState('lundavägen 1')
	const geocode = useGeoCoding()

	const location = {
		// address: "Rasmusgatan 2A, Malmö",
		lat: 55.58354,
		lng: 13.01373,
	}

	useEffect(() => {
		const getCenter = async () => {
			await geocode.getLatLng('mälstakroken 5')
			console.log('position in homepage.', geocode.position)
			// center.lat = geocode.position.lat
			// center.lng = geocode.position.lng
			console.log('center', center)
			console.log('lat', geocode.lat)
			console.log('lng', geocode.lng)

			setCenter(center => ({
				...center,
				lat: geocode.lat,
				lng: geocode.lng,
			}))
			console.log('new center', center)
			return center
			// console.log('latlng', latlng)

			// return geocode.position
		}

		getCenter()

		// console.log('center in use effect', newCenter)
		// center.lat = newCenter.lat
		// center.lng = newCenter.lng
	}, [])

	return (
		<Container fluid className='m-0 p-0'>
			<Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<Map
					center={center}
					// onClick={onClick}
					// onIdle={onIdle}
					zoom={zoom}
					style={{
						flexGrow: '1',
						height: '100vh',
						width: '100vw',
						position: 'relative',
					}}
				/>
			</Wrapper>
			{/* {form} */}
		</Container>
	)
}

export default HomePage
