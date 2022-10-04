import { useEffect } from 'react'

const useGeoCoding = () => {
	const getLatLng = async address => {
		const geocoder = new google.maps.Geocoder()
		console.log(address)

		const res = await geocoder.geocode(
			{
				address: address,
			}
			// (results, status) => {
			// 	if (status == google.maps.GeocoderStatus.OK) {
			// 		// console.log(results[0].address_components[2].long_name)
			// 		const position = {
			// 			lat: results[0].geometry.location.lat(),
			// 			lng: results[0].geometry.location.lng(),
			// 		}

			// 		if (position) {
			// 			console.log('position in hook', position)
			// 			return position
			// 		}
			// 	} else {
			// 		return 'No position found'
			// 	}
			// }
		)
		console.log('res', res)
		return res
	}

	// useEffect(() => {
	// 	const position = getLatLng(address)
	// }, [address])
	return { getLatLng }
}

export default useGeoCoding
