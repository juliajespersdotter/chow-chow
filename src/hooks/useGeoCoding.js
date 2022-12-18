const useGeoCoding = () => {
	const getLatLng = async address => {
		const geocoder = new google.maps.Geocoder()

		const res = await geocoder.geocode({
			address: address,
		})
		return res
	}

	const getCity = async latLng => {
		const geocoder = new google.maps.Geocoder()

		const res = await geocoder.geocode({
			location: latLng,
		})

		return res
	}

	return { getLatLng, getCity }
}

export default useGeoCoding
