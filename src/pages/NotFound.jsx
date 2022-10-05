import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

const NotFound = () => {
	return (
		<Container className='py-3'>
			<Alert variant='danger'>
				Sorry, that page could not be found 😔
			</Alert>
		</Container>
	)
}

export default NotFound
