import { useEffect, useState } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'

const Marker = options => {
	const [marker, setMarker] = useState()

	useEffect(() => {
		if (!marker) {
			// console.log('position', position)
			setMarker(
				new google.maps.Marker({
					optimized: false,
				})
			)
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
			marker.addListener('click', () => {
				options.clickFunction(options.foodplace)
				infoWindow.close()
				infoWindow.setContent(options.foodplace.name)
				infoWindow.open(options.map)
			})
		}
	}, [marker, options])

	return null
}

export default Marker
