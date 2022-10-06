import React from 'react'
import Container from 'react-bootstrap/Container'
import { Image } from 'react-bootstrap'

const HomePage = () => {
	return (
		<Container
			fluid
			className='home'
		>
			<Image fluid className='logo' src='images/homepage.jpg' />
		</Container>
)
}

export default HomePage
