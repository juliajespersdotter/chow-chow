import {
	Children,
	cloneElement,
	isValidElement,
	useRef,
	useState,
	useEffect,
	useContext,
} from 'react'
import Button from 'react-bootstrap/Button'
import ThemeContext from '../contexts/ThemeContext'
import UserMarker from './UserMarker'

const Map = ({ style, center, zoom, children }) => {
	const { theme } = useContext(ThemeContext)
	const ref = useRef(null)
	const [map, setMap] = useState()
	const [userMarker, setUserMarker] = useState()
	let mapId = theme == 'dark' ? 'a364ebbb8399f681' : ''

	useEffect(() => {
		mapId = theme == 'dark' ? 'a364ebbb8399f681' : ''
		if (map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					mapId: mapId,
					center: center,
					style: style,
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
			setMap(
				new window.google.maps.Map(ref.current, {
					mapId: mapId,
					center: center,
					style: style,
					zoom: zoom,
				})
			)
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
				setUserMarker(pos)
			})
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter())
		}
	}

	return (
		<>
			<Button onClick={getCurrentLocation} className='text-center w-100 rounded-0'>
				Pan to current Location
			</Button>
			<div id='map' ref={ref} center={center} zoom={zoom}>
				{Children.map(children, child => {
					if (isValidElement(child)) {
						// set the map prop on the child component
						return cloneElement(child, { map })
					}
				})}
				{map && userMarker && <UserMarker map={map} position={userMarker} />}
			</div>
		</>
	)
}

export default Map