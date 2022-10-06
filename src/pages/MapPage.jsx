import Container from 'react-bootstrap/Container'
import Map from '../components/Map'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useState, useEffect } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'
import Marker from '../components/Marker'
import InfoModal from '../components/InfoModal'
import FilterOffcanvas from '../components/FilterOffcanvas'
import useGetQueryFoodplaces from '../hooks/useGetQueryFoodplaces'
import { useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchForm from '../components/SearchForm'

const MapPage = () => {
	const [zoom, setZoom] = useState(17) // initial zoom
	const { getLatLng } = useGeoCoding()
	const [errorMsg, setErrorMsg] = useState(null)
	// const { foodplaces, isLoading } = useFoodplaces()
	const { foodplaces, filterFoodplaces, isLoading } = useGetQueryFoodplaces()
	const [showModal, setShowModal] = useState(false)
	const [place, setPlace] = useState(null)
	const [searchParams, setSearchParams] = useSearchParams(undefined)
	const [center, setCenter] = useState(() => {
		if (searchParams.get('lat')) {
			return {
				lat: Number(searchParams.get('lat')),
				lng: Number(searchParams.get('lng')),
			}
		}
		return {
			lat: 55.58354,
			lng: 13.01373,
		}
	})

	const handleSubmit = async city => {
		if (city) {
			try {
				const latLng = await getLatLng(city)
				const position = {
					lat: latLng.results[0].geometry.location.lat(),
					lng: latLng.results[0].geometry.location.lng(),
				}
				setCenter(position)
				setSearchParams(position)
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

	return (
		<Container fluid className='m-0 p-0'>
			<div className='filter-search'>
				<FilterOffcanvas
					onSubmit={handleSubmit}
					filterMarkers={filterFoodplaces}
				/>
				<SearchForm />
			</div>
			{/* {isError && (
				<Alert variant='danger'>An error has occurred: {error}</Alert>
			)} */}
			{isLoading && <LoadingSpinner />}
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
			
		</Container>
	)
}

export default MapPage
