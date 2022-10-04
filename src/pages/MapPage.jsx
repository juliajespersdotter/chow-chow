import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Map from '../components/Map'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useState, useEffect } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'
import Marker from '../components/Marker'
import useFoodplaces from '../hooks/useFoodplaces'
import InfoModal from '../components/InfoModal'
import SearchForm from '../components/SearchForm'
import FilterOffcanvas from '../components/FilterOffcanvas'
import useGetQueryFoodplaces from '../hooks/useGetQueryFoodplaces'

const MapPage = () => {
	const [zoom, setZoom] = useState(17) // initial zoom
	const { getLatLng } = useGeoCoding()
	const [center, setCenter] = useState({
		lat: 55.58354,
		lng: 13.01373,
	})
	const [errorMsg, setErrorMsg] = useState(null)
	// const { foodplaces, isLoading } = useFoodplaces()
	const { foodplaces, filterFoodplaces, isLoading } = useGetQueryFoodplaces()
	const [showModal, setShowModal] = useState(false)
	const [place, setPlace] = useState(null)

	const handleSubmit = async city => {
		if (city) {
			try {
				const latLng = await getLatLng(city)
				const position = {
					lat: latLng.results[0].geometry.location.lat(),
					lng: latLng.results[0].geometry.location.lng(),
				}
				setCenter(position)
				console.log('position', position)
			} catch (err) {
				setErrorMsg(err.message)
				console.log(errorMsg)
			}
		}
	}

	const onClick = foodplace => {
		setPlace(foodplace)
		setShowModal(!showModal)
	}

	// useEffect(() => {
	// 	if (position.lat && position.lng) {
	// 		setCenter({ lat: position.lat, lng: position.lng })
	// 	}
	// }, [position])

	return (
		<Container fluid className='m-0 p-0'>
			<div className='filter-button'>
				<FilterOffcanvas
					onCityFormSubmit={handleSubmit}
					filterFoodplaces={filterFoodplaces}
				/>
			</div>
			{/* {isError && (
				<Alert variant='danger'>An error has occurred: {error}</Alert>
			)} */}
			{isLoading && <p>Loading...</p>}
			<Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<div className='vh-75'>
					<Map
						center={center}
						zoom={zoom}
						options={{
							styles: [
								{
									featureType: 'all',
									elementType: 'all',
									stylers: [{ visibility: 'off' }],
								},
							],
						}}
					>
						{foodplaces &&
							foodplaces.map(foodplace => (
								<Marker
									position={foodplace.geopoint}
									foodplace={foodplace}
									clickFunction={onClick}
									key={foodplace.id}
								/>
							))}
						{showModal && (
							<InfoModal
								data={place}
								show={showModal}
								onClick={onClick}
							/>
						)}
					</Map>
				</div>
			</Wrapper>

			<SearchForm onSubmit={handleSubmit} />
		</Container>
	)
}

export default MapPage
