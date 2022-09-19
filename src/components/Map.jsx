import { useRef, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

const Map = ({ style, center, zoom }) => {
	const ref = useRef(null)
	const [map, setMap] = useState()
	// const [center, setCenter] = useState({})

	let infoWindow = new google.maps.InfoWindow()

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
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
			<div ref={ref} style={style} center={center} zoom={zoom}>
				{/* {Children.map(children, child => {
					if (isValidElement(child)) {
						// set the map prop on the child component
						return cloneElement(child, { map });
					}
				})} */}
			</div>
			<Button onClick={getCurrentLocation}>
				Pan to current Location
			</Button>
		</>
	)
}

export default Map
