import {
	Children,
	cloneElement,
	isValidElement,
	useRef,
	useState,
	useEffect,
} from 'react'
import Button from 'react-bootstrap/Button'
import Marker from './Marker'

const Map = ({ style, center, zoom, children }) => {
	const ref = useRef(null)
	const [map, setMap] = useState()
	let infoWindow = new google.maps.InfoWindow()

	useEffect(() => {
		if (map) {
			map.setCenter(center)
			setMarkerPos(center)
		}
	}, [center])

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					mapId: '7cad50f105533ffb',
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
<<<<<<< HEAD
			<div className="v-map" ref={ref} style={style} center={center} zoom={zoom}>
				{Children.map(children, (child) => {
=======
			<Button onClick={getCurrentLocation} className='text-center w-100'>
				Pan to current Location
			</Button>
			<div ref={ref} style={style} center={center} zoom={zoom}>
				{Children.map(children, child => {
>>>>>>> merge/johan
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
