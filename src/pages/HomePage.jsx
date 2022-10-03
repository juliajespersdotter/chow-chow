import React from 'react'
import Container from 'react-bootstrap/Container'
import { Image } from 'react-bootstrap'

const HomePage = () => {
	return (
		<Container
			fluid
			className='home h-75 m-0 p-0'
		>
			<div className="logo">
				<Image src='images/logo.png' />
			</div>

		</Container>
)
}

export default HomePage
