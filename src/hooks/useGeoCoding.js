const useGeoCoding = () => {
	const getLatLng = async address => {
		const geocoder = new google.maps.Geocoder()

		const res = await geocoder.geocode({
			address: address,
		})
		return res
	}

	return { getLatLng }
}

export default useGeoCoding
