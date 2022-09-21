import { useEffect, useState } from 'react'
import useGeoCoding from '../hooks/useGeoCoding'

const Marker = options => {
	const [marker, setMarker] = useState()
	// const { position } = useGeoCoding(options.position)

	// console.log(options)
	// console.log(position)

	useEffect(() => {
		if (!marker) {
			// console.log('position', position)
			setMarker(
				new google.maps.Marker({
					icon: 'https://cdn-icons-png.flaticon.com/32/1404/1404945.png',
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
		}
	}, [marker, options])

	return null
}

export default Marker
