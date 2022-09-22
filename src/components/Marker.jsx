import { useEffect, useState } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'
import InfoModal from './InfoModal'

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

			marker.addListener("click", () => {
				options.clickFunction(options.foodplace)
			})
		}
	}, [marker, options])

	return null
}

export default Marker
