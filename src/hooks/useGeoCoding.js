import { useState, useEffect } from 'react'

const useGeoCoding = address => {
	const [position, setPosition] = useState({ lat: null, lng: null })
	const [error, setError] = useState('')
	const [isError, setIsError] = useState(false)

	const getLatLng = async () => {
		setIsError(false)
		setError('')
		const geocoder = new google.maps.Geocoder()
		console.log(address)

		await geocoder.geocode(
			{
				address: address,
			},
			(results, status) => {
				if (status == google.maps.GeocoderStatus.OK) {
					const lat = results[0].geometry.location.lat()
					const lng = results[0].geometry.location.lng()

					if (lat !== null && lng !== null) {
						setPosition({
							lat: lat,
							lng: lng,
						})
					}
				} else {
					// alert(
					// 	'Geocode was not successful for the following reason: ' +
					// 		status
					// )
					setError(status)
					setIsError(true)
				}
			}
		)
	}

	useEffect(() => {
		getLatLng()
	}, [address])

	return { position, getLatLng, error, isError }
}

export default useGeoCoding
