import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'
import { collection, addDoc } from 'firebase/firestore'
import useGeoCoding from '../hooks/useGeoCoding'
import { db } from '../firebase'

const NewFoodplaceForm = () => {
	const { getLatLng, error, isError } = useGeoCoding()
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
		const cuisine = data.cuisine.split(',')

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
					cuisine: cuisine,
					meals: data.meals,
					email: data.email,
					phone: data.phone,
					url: data.url,
					geopoint: position,
					facebook: data.facebook,
					approved: false,
				})
			}
		} catch (err) {
			console.log(err.message)
		}

		console.log(data)
		reset()
	}

	return (
		<Form className='p-1' onSubmit={handleSubmit(onCreateFoodPlace)}>
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
			<Form.Group>
				<Form.Check {...register('meals')} value='Breakfast' />
				<Form.Check.Label>Breakfast</Form.Check.Label>
				<Form.Check {...register('meals')} value='Lunch' />
				<Form.Check.Label>Lunch</Form.Check.Label>
				<Form.Check {...register('meals')} value='Dinner' />
				<Form.Check.Label>Dinner</Form.Check.Label>
			</Form.Group>
			<Form.Group controlId='cuisine' className='mb-3'>
				<Form.Label>Cuisine</Form.Label>
				<Form.Control
					{...register('cuisine', {
						required: 'Restaurant needs cuisine',
					})}
					type='cuisine'
				/>
				<Form.Text>Separate with commas</Form.Text>
			</Form.Group>
			<Form.Select {...register('type')} aria-label='Type'>
				<option>Choose type of restaurant</option>
				<option value='kiosk/grill'>Kiosk/Grill</option>
				<option value='cafe'>Café</option>
				<option value='restaurant'>Restaurant</option>
				<option value='fast-food'>Fast-food</option>
				<option value='foodtruck'>Foodtruck</option>
			</Form.Select>
			<Form.Group controlId='email' className='mb-3'>
				<Form.Label>Email</Form.Label>
				<Form.Control {...register('email')} type='email' />
			</Form.Group>
			<Form.Group controlId='phone' className='mb-3'>
				<Form.Label>Telephone</Form.Label>
				<Form.Control {...register('phone')} type='number' />
			</Form.Group>
			<Form.Group controlId='url' className='mb-3'>
				<Form.Label>Page</Form.Label>
				<Form.Control {...register('url')} type='url' />
			</Form.Group>
			<Form.Group controlId='facebook' className='mb-3'>
				<Form.Label>Facebook</Form.Label>
				<Form.Control {...register('facebook')} type='facebook' />
			</Form.Group>
			<Form.Group controlId='instagram' className='mb-3'>
				<Form.Label>Instagram</Form.Label>
				<Form.Control {...register('instagram')} type='instagram' />
			</Form.Group>
			<Button type='submit'>Submit</Button>
		</Form>
	)
}

export default NewFoodplaceForm
