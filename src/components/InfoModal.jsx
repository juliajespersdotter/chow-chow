import Offcanvas from 'react-bootstrap/Offcanvas'
import useDirections from '../hooks/useDirections'

const InfoModal = ({ data, show, onClick }) => {
	const { url } = useDirections()

	return (
		<Offcanvas
			show={show}
			onHide={onClick}
			className="bg-dark text-light"
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title className="d-flex flex-column align-items-start">
					<h2>{data.name}</h2>
					<img src='https://via.placeholder.com/150?text=No image found' alt="image for restaurant" />
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className="d-flex flex-column align-items-start">
				<span className="text-muted fst-italic">{data.cuisine}</span>
				<h5> {data.description} </h5>

				{data.url && (<span>{data.url}</span>)}
				{data.email && (<span>{data.email}</span>)}
				{data.phone && (<span>{data.phone}</span>)}
				{data.facebook && (<span>{data.facebook}</span>)}

				<a href={url(data.name)} target='_blank'>
					Show on Google Maps
				</a>
			</Offcanvas.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer> */}
		</Offcanvas>
	)
}

export default InfoModal