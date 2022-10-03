import React from 'react'
import { Image } from 'react-bootstrap'

const FoodplaceItem = ({ foodplace }) => {
	return (
		<div className='w-100 m-auto d-flex foodplace-item mb-3 p-1 align-items-center'>
			<Image fluid className='w-25 p-3' src='images/foodplace.png' />
			<div className='w-100 align-items-center p-3 d-flex justify-content-between'>
				<div>
					<h4 className='header w-100 m-0'>{foodplace.name}</h4>
					<p className='m-0'>{foodplace.city}</p>
					<span className='text-muted mb-2'>
						{foodplace.streetadress}
					</span>
					<p>{foodplace.cuisine}</p>

					<p className='mt-1'>{foodplace.description}</p>
				</div>

				<div>
					<p>{foodplace.type}</p>
					<ul>
						{foodplace.meals.map((meal, i) => (
							<li key={i}>{meal}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default FoodplaceItem
