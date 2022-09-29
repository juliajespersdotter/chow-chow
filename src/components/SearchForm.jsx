import { useRef } from 'react'
import Form from 'react-bootstrap/Form'

const SearchForm = ({ onSubmit }) => {
	const cityRef = useRef()

	const handleSearch = (e) => {
		e.preventDefault()

		if (cityRef.current.value) {
			onSubmit(cityRef.current.value)
		}
	}

	return (
		<Form className='p-1' onSubmit={handleSearch}>
			<Form.Group controlId='city' className='mb-3'>
				<Form.Control ref={cityRef} type='text' placeholder="Search by city"/>
			</Form.Group>
		</Form>
	)
}

export default SearchForm