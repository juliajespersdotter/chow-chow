import { useState, useMemo } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import useGetQueryFoodplaces from '../hooks/useGetQueryFoodplaces'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const FilterOffcanvas = ({ filterMarkers, onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const [show, setShow] = useState(false)

	useEffect(() => {
		filterMarkers({ fetchAll: true })
		filterFoodplaces({ fetchAll: true })
	}, [])

	const { foodplaces, isLoading, filterFoodplaces } = useGetQueryFoodplaces()

	console.log(foodplaces)
	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)

	const FilterFoodplaces = async data => {
		console.log(data)
		filterFoodplaces(data)
		filterMarkers(data)
	}

	return (
		<>
			<Button onClick={handleShow} className='outline-primary'>
				Filter Restaurants
			</Button>

			<Offcanvas show={show} onHide={handleClose} className='offcanvas'>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className='h-text'>
						Filter through restaurants
					</Offcanvas.Title>
				</Offcanvas.Header>

				<Offcanvas.Body>
					{isLoading && <p>Loading ....</p>}
					{foodplaces && (
						<>
							<Form onSubmit={handleSubmit(FilterFoodplaces)}>
								<p>By type</p>
								<Form.Select
									placeholder='Select cuisine'
									{...register('type')}
									className='form-select mb-3'
								>
									<option value='All'>All Types</option>
									<option value='kiosk/grill'>
										Kiosk/Grill
									</option>
									<option value='café'>Café</option>
									<option value='restaurant'>
										Restaurant
									</option>
									<option value='fast-food'>Fast-Food</option>
									<option value='foodtruck'>Foodtruck</option>
								</Form.Select>

								<p>By Cuisine</p>
								<Form.Select
									placeholder='Select cuisine'
									{...register('cuisine')}
									className='form-select mb-3'
								>
									<option value='All'>All Cuisine</option>

									{foodplaces.map(foodplace =>
										foodplace.cuisine.map(
											(cuisineItem, i) => (
												<option
													key={i}
													value={cuisineItem}
												>
													{cuisineItem}
												</option>
											)
										)
									)}
								</Form.Select>
								<Form.Group controlId='city' className='mb-3'>
									<Form.Control
										{...register('city')}
										type='text'
										placeholder='Search by city'
									/>
								</Form.Group>

								<Button
									type='submit'
									className='btn-color my-3'
								>
									Filter
								</Button>
							</Form>

							<ListGroup className='foodplace-listgroup'>
								{!foodplaces.length && (
									<Alert variant='warning'>
										No foodplaces found
									</Alert>
								)}
								{foodplaces.map((foodplace, index) => (
									<ListGroup.Item
										action
										key={index}
										onClick={() => {
											foodplace
										}}
									>
										<h3>{foodplace.name}</h3>
										<span>
											{foodplace.streetadress +
												' ' +
												foodplace.city}
										</span>
										<br />
										<span className='text-muted meals-types'>
											{foodplace.meals.map(meal => (
												<span
													key={meal}
													className='pe-1'
												>
													{meal}
												</span>
											))}
											|{' '}
											<span className='p-1'>
												{foodplace.type}
											</span>
										</span>
									</ListGroup.Item>
								))}
							</ListGroup>
						</>
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}

export default FilterOffcanvas
