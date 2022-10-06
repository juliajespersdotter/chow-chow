import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import { Image } from 'react-bootstrap'

const Navigation = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='md'>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					<Image fluid className='' src='images/logo-nav.png' />
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
						<Nav.Link as={NavLink} end to='/map'>
							Map
						</Nav.Link>
						<Nav.Link as={NavLink} end to='/foodplaces'>
							Foodplaces
						</Nav.Link>
						<Nav.Link as={NavLink} end to='/add'>
							Add Foodplace
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
