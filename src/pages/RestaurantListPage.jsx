import React from 'react'
import FoodPlaceItem from '../components/FoodPlaceItem'
import useFoodplaces from '../hooks/useFoodplaces'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RestaurantListPage = () => {
	const { foodplaces, isLoading } = useFoodplaces()
	return (
		<Container>
			{isLoading && <p>Loading...</p>}
			{!isLoading && (
				<>
					<h3 className='text-center w-100 mt-3 p-3'>
						There are {foodplaces.length} foodplaces to choose from!
					</h3>
					<Row xs={1} sm={1} md={2} lg={8}>
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

export default RestaurantListPage
