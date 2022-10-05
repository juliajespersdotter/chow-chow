import { useState, useMemo } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import useGetQueryFoodplaces from '../hooks/useGetQueryFoodplaces'
import { useForm } from 'react-hook-form'
import SearchForm from '../components/SearchForm'
import useGeoCoding from '../hooks/useGeoCoding'
import useFoodplaces from '../hooks/useFoodplaces'
import { useEffect } from 'react'

const FilterOffcanvas = ({ filterMarkers }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const [show, setShow] = useState(false)
	const [errorMsg, setErrorMsg] = useState(null)

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
					{isLoading && <p>Loading ....</p>}
					{foodplaces && (
						<>
							<Form onSubmit={handleSubmit(FilterFoodplaces)}>
								<p>By type</p>
								<Form.Select
									{...register('type')}
									className='form-select mb-3'
								>
									<option value='All'>All Types</option>

									{foodplaces.map((foodplace, i) => (
										<option key={i} value={foodplace.type}>
											{foodplace.type}
										</option>
									))}
								</Form.Select>

								<p>By Cuisine</p>
								<Form.Select
									{...register('cuisine')}
									className='form-select mb-3'
								>
									<option value='All'>All Cuisine</option>

									{foodplaces.map((foodplace, i) => (
										<option
											key={i}
											value={foodplace.cuisine}
										>
											{foodplace.cuisine}
										</option>
									))}
								</Form.Select>

								<Button
									type='submit'
									className='btn-color my-3'
								>
									Filter
								</Button>
							</Form>

							<ListGroup className='foodplace-listgroup'>
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
										<span>
											{foodplace.meals} | {foodplace.type}
										</span>
									</ListGroup.Item>
								))}
							</ListGroup>
						</>
					)}

					{/* <SearchForm /> */}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}

export default FilterOffcanvas
