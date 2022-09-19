import { useRef, useState, useEffect } from 'react'

const Map = ({ center, style, zoom }) => {
	const ref = useRef(null)
	const [map, setMap] = useState()

	useEffect(() => {
		if (ref.current && !map) {
			setMap(
				new window.google.maps.Map(ref.current, {
					center: center,
					style: style,
					zoom: zoom,
				})
			)
		}
	}, [ref, map])

	return (
		<>
			<div ref={ref} style={style} center={center} zoom={zoom}>
				{/* {Children.map(children, child => {
					if (isValidElement(child)) {
						// set the map prop on the child component
						return cloneElement(child, { map });
					}
				})} */}
			</div>
		</>
	)
}

export default Map
