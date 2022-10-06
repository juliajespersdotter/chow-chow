import React from 'react'
import Container from 'react-bootstrap/Container'
import { Image } from 'react-bootstrap'

const HomePage = () => {
	return (
		<Container
			fluid
			className='home h-75 m-0 p-0 d-flex align-items-center justify-content-center'
		>
			<Image fluid className='logo' src='images/logo.png' />
		</Container>
)
}

export default HomePage
