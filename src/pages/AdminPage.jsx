import { useMemo, useRef, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import NewFoodplaceForm from '../components/NewFoodplaceForm'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import ListGroup from 'react-bootstrap/ListGroup'
import useFoodplaces from '../hooks/useFoodplaces'
import { DropdownFilter, TextSearchFilter } from '../utilities/filters'
import AdminTable from '../components/AdminTable'
import Alert from 'react-bootstrap/Alert'
import LoadingSpinner from '../components/LoadingSpinner'
import useGetUsers from '../hooks/useGetUsers'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import useGeoCoding from '../hooks/useGeoCoding'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import UpdateFoodPlaceForm from '../components/UpdateFoodPlaceForm'

const AdminPage = () => {
	const { getLatLng, error, isError } = useGeoCoding()
	const { foodplaces, isLoading } = useFoodplaces({
		fetchUnApproved: true,
	})
	const { users, loading } = useGetUsers()
	const [showForm, setShowForm] = useState(false)
	const [foodplaceData, setFoodplaceData] = useState(null)

	const [errorMsg, setErrorMsg] = useState()
	const [loadingCreateAdmin, setLoadingCreateAdmin] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const updateFoodplace = async (data, id) => {
		setShowForm(true)
		setFoodplaceData({ data: data, id })
	}

	const createAdmin = async data => {
		// make sure user has entered the same password in both input fields
		if (data.password !== data.passwordConfirm) {
			return setErrorMsg('The passwords does not match')
		}

		// try to sign up the user with the specified credentials
		try {
			setLoadingCreateAdmin(true)

			await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			)

			await addDoc(collection(db, 'users'), {
				email: data.email,
				name: data.name,
				photoURL: data.photo,
			})

			reset()
			setLoadingCreateAdmin(false)
		} catch (err) {
			setLoadingCreateAdmin(false)
		}
	}

	const columns = useMemo(
		() => [
			{
				Header: 'Unapproved Foodplaces',
				columns: [
					{
						id: 'id',
						Header: 'Name',
						accessor: 'name',
						Filter: TextSearchFilter,
					},
					{
						Header: 'Address',
						accessor: 'streetadress',
					},
					{
						Header: 'City',
						accessor: 'city',
						Filter: DropdownFilter,
					},
					{
						Header: 'Description',
						accessor: 'description',
					},
					{
						Header: 'Cuisine',
						accessor: 'cuisine',
						Filter: DropdownFilter,
					},
					{
						Header: 'Type',
						accessor: 'type',
						Filter: DropdownFilter,
					},
					{
						Header: 'Meals',
						accessor: data =>
							data.meals.map((item, i) => (
								<div key={i}>
									<span key={i} className='ms-2'>
										{item}
									</span>
								</div>
							)),
					},
				],
			},
		],
		[]
	)

	return (
		<>
			<Container className='foodplace-list'>
				{isLoading && <LoadingSpinner />}

				{foodplaces && foodplaces.length === 0 && (
					<Alert variant='warning' className='mt-5'>
						No foodplaces to approve...
					</Alert>
				)}

				{foodplaces && foodplaces.length !== 0 && (
					<div className='p-3'>
						{foodplaces && (
							<>
								<AdminTable
									columns={columns}
									data={foodplaces}
									onEdit={updateFoodplace}
								/>
							</>
						)}
					</div>
				)}
			</Container>

			{showForm && (
				<Container className='py-2 mb-2 mt-5 bg-light'>
					<UpdateFoodPlaceForm prefilledData={foodplaceData} />
				</Container>
			)}

			<Container className='py-2'>
				{loading && <p>Loading admins...</p>}

				{users && (
					<>
						<h3 className='text-light'>Admins are: </h3>
						<ListGroup>
							{users.map(user => (
								<ListGroup.Item
									className='w-100'
									key={user.email}
								>
									<span>{user.name}</span>
									<div className='w-25'>
										<img
											className='w-25'
											src={user.photoURL}
										/>
									</div>
								</ListGroup.Item>
							))}
						</ListGroup>
					</>
				)}
			</Container>

			<Container className='mt-3 mb-3 text-light'>
				<h3>Add admin: </h3>
				<Form onSubmit={handleSubmit(createAdmin)}>
					<Form.Group id='email' className='mb-1'>
						<Form.Control
							{...register('email', {
								required: 'Du m??ste ange en email',
								minLength: {
									value: 6,
									message: 'Du m??ste ange en giltig email',
								},
							})}
							placeholder='Email'
							type='email'
						/>
					</Form.Group>

					<Form.Group id='photo' className='mb-1'>
						<Form.Control
							{...register('photo', {
								minLength: {
									value: 6,
									message: 'Du m??ste ange en giltig email',
								},
							})}
							placeholder='Foto URL'
							type='text'
						/>
					</Form.Group>

					<Form.Group id='name' className='mb-1'>
						<Form.Control
							{...register('name', {
								required: 'Du m??ste ange ett namn',
								minLength: {
									value: 3,
									message: 'Du m??ste ange en normalt namn',
								},
							})}
							placeholder='Namn'
							type='text'
						/>
					</Form.Group>

					<Form.Group id='password' className='mb-1'>
						<Form.Control
							{...register('password', {
								required: 'Du m??ste ange ett l??senord',
								minLength: {
									value: 5,
									message:
										'Ange minst 5 tecken i ditt l??senord',
								},
							})}
							placeholder='L??senord'
							type='password'
						/>
					</Form.Group>

					<Form.Group id='password-confirm' className='mb-1'>
						<Form.Control
							{...register('passwordConfirm', {
								required: 'Du m??ste matcha ditt l??senord',
								minLength: {
									value: 5,
									message: 'Du m??ste ange samma l??senord',
								},
							})}
							placeholder='Bekr??fta l??senord'
							type='password'
						/>
					</Form.Group>

					<Button
						disabled={loadingCreateAdmin}
						type='submit'
						className='mt-1'
					>
						Create Admin
					</Button>
				</Form>

				{errors.title && (
					<Alert className='mt-2' variant='danger'>
						{errors.title.message}
					</Alert>
				)}
			</Container>

			{error && (
				<Alert className='mt-2' variant='danger'>
					{errorMsg}
				</Alert>
			)}
		</>
	)
}

export default AdminPage
