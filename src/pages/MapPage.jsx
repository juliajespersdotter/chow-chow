import Container from 'react-bootstrap/Container'
import Map from '../components/Map'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useState, useContext, useEffect } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'
import Marker from '../components/Marker'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import InfoModal from '../components/InfoModal'
import FilterOffcanvas from '../components/FilterOffcanvas'
import ThemeContext from '../contexts/ThemeContext'
import useGetQueryFoodplaces from '../hooks/useGetQueryFoodplaces'
import { useSearchParams } from 'react-router-dom'
import SearchForm from '../components/SearchForm'

const MapPage = () => {
	const { theme, setTheme } = useContext(ThemeContext)
	const [zoom, setZoom] = useState(14) // initial zoom
	const { getLatLng, getCity } = useGeoCoding()
	const [errorMsg, setErrorMsg] = useState(null)
	const { foodplaces, filterFoodplaces, isLoading, isError, error } =
		useGetQueryFoodplaces()
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
			lat: 55.60587,
			lng: 13.00073,
		}
	})

	useEffect(() => {
		const filterInitial = async () => {
			if (searchParams.get('lat')) {
				const latLng = await getCity({
					lat: Number(searchParams.get('lat')),
					lng: Number(searchParams.get('lng')),
				})
				const city = latLng.results[0].address_components[3].long_name
				filterFoodplaces({ city: city, cuisine: 'All', type: 'All' })
			} else {
				const latLng = await getCity(center)
				const city = latLng.results[0].address_components[3].long_name
				filterFoodplaces({ city: city, cuisine: 'All', type: 'All' })
			}
		}

		filterInitial()
	}, [searchParams])

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
				filterFoodplaces({
					city: city,
					cuisine: 'All',
					type: 'All',
				})
			} catch (err) {
				setErrorMsg(err.message)
				console.log(errorMsg)
			}
		}
	}

	const onClick = foodplace => {
		if (foodplace) {
			setPlace(foodplace)
			setCenter(foodplace.geopoint)
		}
		setShowModal(!showModal)
	}

	return (
		<Container fluid className='m-0 p-0'>
			<div className='filter-search'>
				{errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
				{isError && (
					<Alert variant='danger'>
						An error has occurred: {error}
					</Alert>
				)}
				<FilterOffcanvas
					onCitySearch={handleSubmit}
					filterMarkers={filterFoodplaces}
					showModal={showModal}
					clickFoodplace={onClick}
				/>
				<SearchForm
					onSubmit={handleSubmit}
					foodplaces={foodplaces}
					showFoodplace={onClick}
				/>
				<Button
					onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
					className='button-theme filter-button'
					variant='light'
				>
					{theme === 'dark' ? '🌚' : '🌞'}
				</Button>
			</div>
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
