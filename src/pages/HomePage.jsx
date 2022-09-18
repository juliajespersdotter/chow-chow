import Container from "react-bootstrap/Container";
import Map from "../components/Map";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const HomePage = () => {
	const location = {
		address: "1600 Amphitheatre Parkway, Mountain View, california.",
		lat: 37.42216,
		lng: -122.08427,
	};

	return (
		<Container fluid className="m-0 p-0">
			{/* <Wrapper apiKey={import.meta.env.VITE_FIREBASE_GOOGLE_MAPS_API_KEY}> */}
			<div id="map" className="m-0 p-0 w-100">
				<Map />
			</div>
			{/* </Wrapper> */}
		</Container>
	);
};

export default HomePage;
