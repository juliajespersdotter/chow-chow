import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { collection, addDoc } from 'firebase/firestore'
import useGeoCoding from '../hooks/useGeoCoding'
import { db } from '../firebase'

const NewFoodplaceForm = () => {
	const { getLatLng, error, isError } = useGeoCoding()
	const [setErrorMsg, errorMsg] = useState('')
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			meals: [],
		},
	})

	const onCreateFoodPlace = async data => {
		// post to the database
		if (data.address) {
			try {
				const latLng = await getLatLng(data.address)
				const position = {
					lat: latLng.results[0].geometry.location.lat(),
					lng: latLng.results[0].geometry.location.lng(),
				}

				if (position.lat && position.lng) {
					await addDoc(collection(db, 'foodplaces'), {
						city: data.city,
						name: data.name,
						description: data.description,
						streetadress: data.address,
						type: data.type,
						cuisine: data.cuisine,
						meals: data.meals,
						email: data.email,
						phone: data.phone,
						url: data.url,
						geopoint: position,
						facebook: data.facebook,
						approved: false,
					})
				} else {
					throw new Error('No position found')
				}
			} catch (err) {
				setErrorMsg(err)
			}
			reset()
		}
	}

	return (
		<Form
			className='food-form p-1'
			onSubmit={handleSubmit(onCreateFoodPlace)}
		>
			<Form.Group controlId='name' className='mb-3'>
				<Form.Label>Restaurant Name</Form.Label>
				<Form.Control
					{...register('name', {
						required: 'Restaurant needs a name',
						minLength: {
							value: 3,
							message: "That's too short to be a proper name",
						},
					})}
					type='text'
					required
				/>
				<Form.Text>Enter the name of the restaurant</Form.Text>
			</Form.Group>
			<Form.Group controlId='city' className='mb-3'>
				<Form.Label>City</Form.Label>
				<Form.Control
					{...register('city', {
						required: 'Restaurant needs a city',
						minLength: {
							value: 3,
							message: "That's too short to be a city",
						},
					})}
					type='text'
				/>
				<Form.Text>Where is the restaurant located</Form.Text>
			</Form.Group>
			<Form.Group controlId='description' className='mb-3'>
				<Form.Label>Description</Form.Label>
				<Form.Control
					{...register('description', {
						required: 'Restaurant needs a description',
						minLength: {
							value: 3,
							message:
								"That's too short to be a proper description",
						},
					})}
					type='text'
				/>
				<Form.Text>Description</Form.Text>
			</Form.Group>
			<Form.Group controlId='address' className='mb-3'>
				<Form.Label>Street Address</Form.Label>
				<Form.Control
					{...register('address', {
						required: 'Restaurant needs an address',
						minLength: {
							value: 3,
							message: "That's too short to be a proper address",
						},
					})}
					type='text'
				/>
			</Form.Group>
			<Form.Label>Meals</Form.Label>
			<div className='d-flex align-items-center meals-wrapper'>
				<Form.Group className='d-flex justify-content-between w-25 meal-checkbox'>
					<div className='d-flex'>
						<Form.Check {...register('meals')} value='Breakfast' />
						<Form.Check.Label className='ms-1 me-3'>
							Breakfast
						</Form.Check.Label>
					</div>
					<div className='d-flex'>
						<Form.Check {...register('meals')} value='Lunch' />
						<Form.Check.Label className='ms-1 me-3'>
							Lunch
						</Form.Check.Label>
					</div>
					<div className='d-flex'>
						<Form.Check {...register('meals')} value='Dinner' />
						<Form.Check.Label className='ms-1 me-3'>
							Dinner
						</Form.Check.Label>
					</div>
				</Form.Group>

				<div className='d-flex ms-5 cuisine-wrapper'>
					<Form.Select
						className='mb-3 mt-3 d-flex w-50'
						{...register('cuisine')}
						aria-label='Cuisine'
					>
						<option>Choose Cuisine</option>
						<option value='italian'>Italian</option>
						<option value='indian'>Indian</option>
						<option value='chinese'>Chinese</option>
						<option value='japanese'>Japanese</option>
						<option value='scandinavian'>Scandinavian</option>
						<option value='french'>French</option>
						<option value='mexican'>Mexican</option>
						<option value='thai'>Thai</option>
						<option value='american'>American</option>
						<option value='other'>Other</option>
					</Form.Select>
					<Form.Select
						className='type-select m-3 d-flex w-75'
						{...register('type')}
						aria-label='Type'
					>
						<option>Choose Type of Foodplace</option>
						<option value='kiosk/grill'>Kiosk/Grill</option>
						<option value='café'>Café</option>
						<option value='restaurant'>Restaurant</option>
						<option value='fast-food'>Fast-Food</option>
						<option value='foodtruck'>Foodtruck</option>
					</Form.Select>
				</div>
			</div>

			<Form.Group
				className='d-flex mb-3 mt-3 flex-wrap optional-info-wrapper'
				controlId='optional-info'
			>
				<div className='w-25 optional-info'>
					<Form.Label>Email</Form.Label>
					<Form.Control {...register('email')} type='email' />
				</div>
				<div className='w-25 ms-4 optional-info'>
					<Form.Label>Telephone</Form.Label>
					<Form.Control {...register('phone')} type='number' />
				</div>
				<div className='page-width-container mt-2 me-5 optional-info'>
					<Form.Label>Page</Form.Label>
					<Form.Control
						className='page-width'
						{...register('url')}
						type='url'
					/>
				</div>
				<div className='w-25 mt-2 optional-info'>
					<Form.Label>Facebook</Form.Label>
					<Form.Control {...register('facebook')} type='facebook' />
				</div>
				<div className='w-25 ms-4 mt-2 optional-info'>
					<Form.Label>Instagram</Form.Label>
					<Form.Control {...register('instagram')} type='instagram' />
				</div>
			</Form.Group>
			{isError && <Alert className='danger'>{error}</Alert>}
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default NewFoodplaceForm
