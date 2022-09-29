import { useState } from 'react'

const useGeoCoding = () => {
	const [position, setPosition] = useState({})
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
						return position
					}
				} else {
					setError(status)
					setIsError(true)
				}
			}
		)
		return position
	}

	return { position, getLatLng, error, isError }
}

export default useGeoCoding
