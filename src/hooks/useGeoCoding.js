const useGeoCoding = () => {
	const getLatLng = async address => {
		const geocoder = new google.maps.Geocoder()
		console.log(address)

		const res = await geocoder.geocode({
			address: address,
		})
		return res
	}

	return { getLatLng }
}

export default useGeoCoding
