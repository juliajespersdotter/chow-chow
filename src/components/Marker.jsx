import { useEffect, useState } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'

const Marker = options => {
	const [marker, setMarker] = useState()
	// const { position } = useGeoCoding(options.position)

	// console.log(options)
	// console.log(position)
	console.log(options.foodplace)

	useEffect(() => {
		if (!marker) {
			// console.log('position', position)
			setMarker(new google.maps.Marker({}))
		}

		// remove marker from map on unmount
		return () => {
			if (marker) {
				marker.setMap(null)
			}
		}
	}, [marker])

	useEffect(() => {
		if (marker) {
			marker.setOptions(options)
			let infoWindow = new google.maps.InfoWindow()
			infoWindow.setPosition(options.position)
			infoWindow.setContent(options.foodplace.name)
			infoWindow.open(options.map)
		}
	}, [marker, options])

	return null
}

export default Marker
