import React from 'react'

const useDirections = (place) => {
	const BASE_URL = "https://www.google.com/maps/search/?api=1&query="

	const url = (place) => {
		return `${BASE_URL}${place}`
	}

	return {
		url
	}

}

export default useDirections

