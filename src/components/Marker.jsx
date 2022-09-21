import { useEffect, useState } from 'react'

const Marker = options => {
	const [marker, setMarker] = useState()

	// console.log(position)

	useEffect(() => {
		if (!marker) {
			setMarker(
				new google.maps.Marker({
					// position,
					// map,
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
