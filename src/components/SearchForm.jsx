import { useRef } from 'react'
import Form from 'react-bootstrap/Form'

const SearchForm = ({ onSubmit }) => {
	const cityRef = useRef()

    const filteredFoodplaces =
        searchInput === ""
            ? foodplaces
            : foodplaces.filter()

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

// import { useRef } from 'react'
// import { Form, Button } from 'react-bootstrap'
// import { Autocomplete } from '@react-google-maps/api'


// const SearchForm = ({onSubmit}) => {

//     const addressRef = useRef()

//     const handleSearch = (e) => {

//         e.preventDefault()

//         if (!addressRef.current.value) {
//             return
//         }

//         onSubmit(addressRef.current.value)

//         addressRef.current.value = ''

//     }

//     return (
//         <Form onSubmit={handleSearch} className='searchaddressform'>
//             <Form.Group controlId='address'>
//                 <Form.Label>Enter city</Form.Label>
//                 <Autocomplete>
//                     <Form.Control type='text' ref={addressRef} required />
//                 </Autocomplete>
//             </Form.Group>
//             <Button className='btn-color' type='submit'>Search</Button>
//         </Form>
//     )

// }

// export default SearchForm