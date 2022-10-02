import React from 'react'
import FoodPlaceItem from '../components/FoodPlaceItem'
import useFoodplaces from '../hooks/useFoodplaces'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'

const FoodplaceListPage = () => {
	const { foodplaces, isLoading } = useFoodplaces()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const sortByFunction = async data => {
		console.log(data)
	}

	return (
		<Container>
			{isLoading && <p>Loading...</p>}
			{!isLoading && (
				<>
					<h3 className='text-center w-100 mt-3 p-3'>
						There are {foodplaces.length} foodplaces to choose from!
					</h3>
					
					{/* <Form onSubmit={handleSubmit(sortByFunction)}>
						<Row className='justify-content-center'>
							<Col xs={12} md={6} lg={4}>
								<Form.Group controlId='formBasic'>
									<Form.Label>Sort by</Form.Label>
									<Form.Control
										as='select'
										{...register('sortBy', { required: true })}
									>
										<option value='name'>Name</option>
										<option value='rating'>Rating</option>
										<option value='price'>Price</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col xs={12} md={6} lg={4}>
								<Form.Group controlId='formBasic'>
									<Form.Label>Order</Form.Label>
									<Form.Control
										as='select'
										{...register('order', { required: true })}
									>
										<option value='asc'>Ascending</option>
										<option value='desc'>Descending</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col xs={12} md={6} lg={4}>
								<Form.Group controlId='formBasicEmail'>
									<Form.Label>Filter by</Form.Label>
									<Form.Control
										as='select'
										{...register('filterBy', { required: true })}
									>
										<option value='all'>All</option>
										<option value='dinner'>dinner</option>
										<option value='vegetarian'>Vegetarian</option>
										<option value='glutenFree'>Gluten free</option>
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row className=''>
							<Col xs={12} md={6} lg={4}>
								<Button className="mb-2 mt-2"variant='primary' type='submit'>
									Submit
								</Button>
							</Col>
						</Row>
					</Form>	 */}

					{/* <Form onSubmit={handleSubmit(sortByFunction)}>
						<Form.Select>
							<option>Filter by</option>
							<option {...register('sortBy')} value='name'>
								Name
							</option>
							<option {...register('sortBy')} value='city'>
								City
							</option>
						</Form.Select>
						<Button type='submit'>🔎</Button>
					</Form> */}
					<Row xs={2} sm={2} md={2} lg={8}>
						{foodplaces.map(foodplace => (
							<Col key={foodplace.id} className='d-flex mb-4'>
								<FoodPlaceItem foodplace={foodplace} />
							</Col>
						))}
					</Row>
				</>
			)}
		</Container>
	)
}

export default FoodplaceListPage
