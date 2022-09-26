import { useEffect, useState } from 'react'

const UserMarker = options => {
	const [marker, setMarker] = useState()

	useEffect(() => {
		if (!marker) {
			setMarker(
				new google.maps.Marker({
					icon: 'https://cdn-icons-png.flaticon.com/64/10/10522.png',
					optimized: false,
				})
			)
			// setMarker(new google.maps.Marker({}))
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

export default UserMarker
