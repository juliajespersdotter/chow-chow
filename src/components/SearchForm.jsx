import { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'

const SearchForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()

	const handleSearch = (e, data) => {
		e.preventDefault()
		console.log(data)
		onSubmit(e, data)
	}

	return (
		<Form className='p-1' onSubmit={handleSearch(handleSubmit)}>
			<Form.Group controlId='city' className='mb-3'>
				<Form.Label>Search by city</Form.Label>
				<Form.Control {...register('city')} type='text' />
			</Form.Group>
			<Form.Group controlId='name' className='mb-3'>
				<Form.Label>Search by name</Form.Label>
				<Form.Control {...register('name')} type='text' />
			</Form.Group>
			<Form.Group controlId='address' className='mb-3'>
				<Form.Label>Search by address</Form.Label>
				<Form.Control {...register('address')} type='text' />
			</Form.Group>
		</Form>
	)
}

export default SearchForm
