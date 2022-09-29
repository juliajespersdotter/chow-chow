import React from 'react'
import Container from 'react-bootstrap/Container'
import { Image } from 'react-bootstrap'

const HomePage = () => {
	return (
		<Container
			fluid
			className='home d-flex justify-content-center align-items-center vh-75 m-0 p-0'
		>
			<div className="logo">
				<Image fluid className='w-25 p-3' src='images/logo.png' />
			</div>
		</Container>
)
}

export default HomePage
