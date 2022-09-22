import React from 'react'
import FoodPlaceItem from '../components/FoodPlaceItem'
import useFoodplaces from '../hooks/useFoodplaces'
import Container from 'react-bootstrap/Container'

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
					{foodplaces.map(foodplace => (
						<FoodPlaceItem
							foodplace={foodplace}
							key={foodplace.id}
						/>
					))}
				</>
			)}
		</Container>
	)
}

export default RestaurantListPage
