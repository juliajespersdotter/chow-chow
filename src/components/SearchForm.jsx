import { useRef } from 'react'
import Form from 'react-bootstrap/Form'

const SearchForm = () => {
	const cityRef = useRef()
	const nameRef = useRef()

	const handleSearch = () => {
		// search the database for corresponding restaurants in area
	}

	// style={{
	// 			padding: '1rem',
	// 			flexBasis: '250px',
	// 			height: '100%',
	// 			overflow: 'auto',
	// 		}}
	return (
		<Form className='p-1' onSubmit={handleSearch}>
			<Form.Group controlId='city' className='mb-3'>
				<Form.Label>Search by city</Form.Label>
				<Form.Control type='city' ref={cityRef} />
				<Form.Text>Search by city</Form.Text>
			</Form.Group>
			<Form.Group controlId='name' className='mb-3'>
				<Form.Label>Search by name</Form.Label>
				<Form.Control type='name' ref={nameRef} />
				<Form.Text>Search by name</Form.Text>
			</Form.Group>
		</Form>
	)
}

export default SearchForm
