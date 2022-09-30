import Offcanvas from 'react-bootstrap/Offcanvas'

const InfoModal = ({ data, show, onClick }) => {
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
			</Offcanvas.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer> */}
		</Offcanvas>
	)
}

export default InfoModal