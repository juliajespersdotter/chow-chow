import React from "react";

const Form = () => {
	return (
		<div
			style={{
				padding: "1rem",
				flexBasis: "250px",
				height: "100%",
				overflow: "auto",
			}}
		>
			<label htmlFor="zoom">Zoom</label>
			<input
				type="number"
				id="zoom"
				name="zoom"
				value={zoom}
				onChange={event => setZoom(Number(event.target.value))}
			/>
			<br />
			<label htmlFor="lat">Latitude</label>
			<input
				type="number"
				id="lat"
				name="lat"
				value={center.lat}
				onChange={event =>
					setCenter({ ...center, lat: Number(event.target.value) })
				}
			/>
			<br />
			<label htmlFor="lng">Longitude</label>
			<input
				type="number"
				id="lng"
				name="lng"
				value={center.lng}
				onChange={event =>
					setCenter({ ...center, lng: Number(event.target.value) })
				}
			/>
			<h3>
				{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}
			</h3>
			{clicks.map((latLng, i) => (
				<pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
			))}
			<button onClick={() => setClicks([])}>Clear</button>
		</div>
	);
};

export default Form;
