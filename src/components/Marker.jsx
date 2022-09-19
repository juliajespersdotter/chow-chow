import { useEffect, useState } from 'react'

const Marker = ({ map, position }) => {
	const [marker, setMarker] = useState();

	console.log("MAKRER PLZ", position)

	useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker({
				position,
				map,
				icon: "https://cdn-icons-png.flaticon.com/32/1404/1404945.png",
			}));
		}

		// remove marker from map on unmount
		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);

	useEffect(() => {
		if (marker) {
			marker.setOptions(position);
		}
	}, [marker, position]);

	return null;
}

export default Marker