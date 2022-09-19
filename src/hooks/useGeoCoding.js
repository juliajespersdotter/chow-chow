import { useState } from 'react'

const useGeoCoding = () => {
	// let latLng = {}
	const [position, setPosition] = useState({})
	const [lat, setLat] = useState(0)
	const [lng, setLng] = useState(0)
	// let res = {}

	const getLatLng = async adress => {
		const geocoder = new google.maps.Geocoder()
		console.log(adress)

		await geocoder.geocode(
			{
				address: adress,
			},
			(results, status) => {
				if (status == google.maps.GeocoderStatus.OK) {
					console.log(results)
					// console.log(results[0].geometry.location.lat())
					// console.log(results[0].geometry.location.lng())
					const lat = results[0].geometry.location.lat()
					const lng = results[0].geometry.location.lng()
					// res = { lat: lat, lng: lng }

					// setLat(lat)
					// setLng(lng)

					console.log('position', lat, lng)
				} else {
					alert(
						'Geocode was not successful for the following reason: ' +
							status
					)
				}
				setLat(results[0].geometry.location.lat())
				setLng(results[0].geometry.location.lng())
				setPosition({ lat: lat, lng: lng })

				return { lat, lng }
			}
		)
	}

	return { getLatLng, position, lat, lng }
}

export default useGeoCoding
