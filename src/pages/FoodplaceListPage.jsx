import { useState } from 'react'
import FoodPlaceItem from '../components/FoodPlaceItem'
import useFoodplaces from '../hooks/useFoodplaces'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import useOrderBy from '../hooks/useOrderBy'
import { useEffect } from 'react'

const FoodplaceListPage = () => {
	const [filterValue, setFilterValue] = useState(null)
	const { foodplaces, isLoading } = useFoodplaces()
	// const { orderedFoodplaces } = useOrderBy(filterValue)

	const sortByFunction = e => {
		if (e.target.value) {
			setFilterValue(e.target.value)
		}
	}

	return (
		<Container>
			{isLoading && <p>Loading...</p>}
			{!isLoading && (
				<>
					<h3 className='text-center w-100 mt-3 p-3'>
						There are {foodplaces.length} foodplaces to choose from!
					</h3>
					<Form onChange={sortByFunction}>
						<Form.Select>
							<option>Filter by</option>
							<option value='name'>Name</option>
							<option value='city'>City</option>
						</Form.Select>
					</Form>
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

export default FoodplaceListPage
