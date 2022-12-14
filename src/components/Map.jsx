import {
	Children,
	cloneElement,
	isValidElement,
	useRef,
	useState,
	useEffect,
	useContext,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ThemeContext from '../contexts/ThemeContext'
import UserMarker from './UserMarker'

const Map = ({ center, zoom, children }) => {
	const { theme } = useContext(ThemeContext)
	const ref = useRef(null)
	const [map, setMap] = useState()
	const [userMarker, setUserMarker] = useState()
	const [searchParams, setSearchParams] = useSearchParams(undefined)
	let mapId = theme == 'dark' ? 'a364ebbb8399f681' : 'ab4f81466110cc51'

	useEffect(() => {
		mapId = theme == 'dark' ? 'a364ebbb8399f681' : 'ab4f81466110cc51'
		if (map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					mapId: mapId,
					center: center,
					zoom: zoom,
				})
			)
		}
	}, [theme])

	useEffect(() => {
		if (map) {
			map.panTo(center)
			map.setZoom(14)
		}
	}, [center])

	useEffect(() => {
		if (ref.current && !map) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(position => {
					const pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					}
					setUserMarker(pos)
					setSearchParams(pos)

					setMap(
						new window.google.maps.Map(ref.current, {
							mapId: mapId,
							center: pos,
							zoom: zoom,
						})
					)
				})
			} else {
				setMap(
					new window.google.maps.Map(ref.current, {
						mapId: mapId,
						center: center,
						zoom: zoom,
					})
				)
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, map.getCenter())
			}
		}
	}, [ref, map])

	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				const pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}
				map.setCenter(pos)
				map.setZoom(16)
				setUserMarker(pos)
				setSearchParams(pos)
			})
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter())
		}
	}

	return (
		<>
			<Button
				onClick={getCurrentLocation}
				className='text-center w-100 rounded-0'
			>
				Pan to current Location
			</Button>

			<div id='map' ref={ref} center={center} zoom={zoom}>
				{Children.map(children, child => {
					if (isValidElement(child)) {
						// set the map prop on the child component
						return cloneElement(child, { map })
					}
				})}
				{map && userMarker && (
					<UserMarker map={map} position={userMarker} />
				)}
			</div>
		</>
	)
}

export default Map
