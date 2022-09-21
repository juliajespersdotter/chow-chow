import { useState, useEffect } from 'react'

const useGeoCoding = address => {
	const [position, setPosition] = useState({ lat: null, lng: null })
	const [error, setError] = useState('')
	const [isError, setIsError] = useState(false)

	const getLatLng = async address => {
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
					// console.log(results[0].address_components[2].long_name)
					const pos = {
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
					}

					if (pos) {
						setPosition(pos)
						console.log('position', position)
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
		return position
	}

	// useEffect(() => {
	// 	getLatLng()
	// }, [address])

	return { position, getLatLng, error, isError }
}

export default useGeoCoding
