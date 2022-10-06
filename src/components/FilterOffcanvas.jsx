import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import useGetQueryFoodplaces from '../hooks/useGetQueryFoodplaces'
import { useForm } from 'react-hook-form'
import LoadingSpinner from './LoadingSpinner'

const FilterOffcanvas = ({ filterMarkers }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const [show, setShow] = useState(false)

	useEffect(() => {
		filterMarkers({ fetchAll: true })
		filterFoodplaces({ fetchAll: true })
	}, [])

	const { foodplaces, isLoading, filterFoodplaces } = useGetQueryFoodplaces()

	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)

	const FilterFoodplaces = async data => {
		filterFoodplaces(data)
		filterMarkers(data)
	}

	return (
		<>
			<Button onClick={handleShow} className='filter-btn'>
				Filter Restaurants
			</Button>

			<Offcanvas show={show} onHide={handleClose} className='offcanvas'>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className='h-text'>
						Filter through restaurants
					</Offcanvas.Title>
				</Offcanvas.Header>

				<Offcanvas.Body>
					{isLoading && <LoadingSpinner />}
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
									<option value='italian'>Italian</option>
									<option value='indian'>Indian</option>
									<option value='chinese'>Chinese</option>
									<option value='japanese'>Japanese</option>
									<option value='scandinavian'>
										Scandinavian
									</option>
									<option value='french'>French</option>
									<option value='mexican'>Mexican</option>
									<option value='thai'>Thai</option>
									<option value='american'>American</option>
									<option value='other'>Other</option>
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
								<Button
									as={Link}
									to={'/foodplaces'}
									className='btn-color my-3 ms-2'
								>
									See all foodplaces
								</Button>
							</Form>

							<ListGroup className='foodplace-listgroup'>
								{!foodplaces.length && (
									<Alert variant='danger'>
										No foodplaces found
									</Alert>
								)}
								{foodplaces
									.slice(0, 5)
									.map((foodplace, index) => (
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
