import Offcanvas from 'react-bootstrap/Offcanvas'
import useDirections from '../hooks/useDirections'

const InfoModal = ({ data, show, onClick }) => {
	const { url } = useDirections()

	return (
		<Offcanvas
			show={show}
			onHide={onClick}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>
					{data.name}
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<h6> {data.description} </h6>
				Show directions on Google Maps:
				<a href={url(data.name)} target='_blank'>Click here</a>
			</Offcanvas.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer> */}
		</Offcanvas>
	)
}

export default InfoModal