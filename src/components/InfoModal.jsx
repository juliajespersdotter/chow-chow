import Modal from 'react-bootstrap/Modal'

const InfoModal = ({ data, show, onClick }) => {
	return (
		<Modal
			show={show}
			onHide={onClick}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{data.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h6> {data.description} </h6>
			</Modal.Body>
			{/* <Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer> */}
		</Modal>
	)
}

export default InfoModal