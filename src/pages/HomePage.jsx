import Container from "react-bootstrap/Container";
import Map from "../components/Map";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState } from "react";

const HomePage = () => {
	const [clicks, setClicks] = useState([]);
	const [zoom, setZoom] = useState(8); // initial zoom
	const [center, setCenter] = useState({
		lat: 55.58354,
		lng: 13.01373,
	});

	// console.log(zoom);
	console.log(center);

	const location = {
		// address: "Rasmusgatan 2A, Malmö",
		lat: 55.58354,
		lng: 13.01373,
	};

	return (
		<Container fluid className="m-0 p-0">
			<Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
				<Map
					center={center}
					// onClick={onClick}
					// onIdle={onIdle}
					zoom={zoom}
					style={{
						flexGrow: "1",
						height: "100vh",
						width: "100vw",
						position: "relative",
					}}
				/>
			</Wrapper>
			{/* {form} */}
		</Container>
	);
};

export default HomePage;
