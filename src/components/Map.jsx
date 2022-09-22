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

const Map = ({ style, center, zoom, children }) => {
	const { theme } = useContext(ThemeContext)
	const ref = useRef(null)
	const [map, setMap] = useState()
	let infoWindow = new google.maps.InfoWindow()
	let mapId = theme == 'dark' ? 'a364ebbb8399f681' : ''

	useEffect(() => {
		mapId = theme == 'dark' ? 'a364ebbb8399f681' : ''
		if (map) {
<<<<<<< HEAD
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
=======
			map.setCenter(center)
>>>>>>> dev/tobbe
		}
	}, [center])

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
<<<<<<< HEAD
					mapId: mapId,
=======
					// mapId: '7cad50f105533ffb',
>>>>>>> dev/tobbe
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
				infoWindow.setPosition(pos)
				infoWindow.setContent('Location found.')
				infoWindow.open(map)
				map.setCenter(pos)
			})
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoWindow, map.getCenter())
		}
	}

	return (
		<>
			<Button onClick={getCurrentLocation} className='text-center w-100'>
				Pan to current Location
			</Button>
			<div id='map' ref={ref} center={center} zoom={zoom}>
				{Children.map(children, child => {
					if (isValidElement(child)) {
						// set the map prop on the child component
						return cloneElement(child, { map })
					}
				})}
				{/* {map && <Marker map={map} position={markerPos} />} */}
			</div>
		</>
	)
}

export default Map
