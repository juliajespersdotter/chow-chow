import { useRef, useState, useEffect } from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "100vh",
};

const center = {
	lat: -3.745,
	lng: -38.523,
};

const Map = () => {
	return (
		<LoadScript
			googleMapsApiKey={import.meta.env.VITE_FIREBASE_GOOGLE_MAPS_API_KEY}
		>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
			>
				{/* Child components, such as markers, info windows, etc. */}
				<></>
			</GoogleMap>
		</LoadScript>
	);
};

export default Map;
