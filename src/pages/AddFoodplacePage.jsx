import React from 'react'
import NewFoodplaceForm from '../components/NewFoodplaceForm'
import Container from 'react-bootstrap/Container'

const AddFoodplacePage = () => {
	return (
		<Container className='p-5'>
			<NewFoodplaceForm />
		</Container>
	)
}

export default AddFoodplacePage
