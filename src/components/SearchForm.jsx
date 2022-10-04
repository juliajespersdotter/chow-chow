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

// import { useRef } from 'react'
// import { Form, Button } from 'react-bootstrap'
// import { Autocomplete } from '@react-google-maps/api'


// const SearchForm = ({onSubmit}) => {

//     // Reference element for input element
//     const addressRef = useRef()

//     // Function to handle form before beeing fully submitted
//     const handleSearch = (e) => {

//         // Stop default form behaviour
//         e.preventDefault()

//         // If input field is empty, return from function
//         if (!addressRef.current.value) {
//             return
//         }

//         // Call function provided though prop, and give it input field value as parameter
//         onSubmit(addressRef.current.value)

//         addressRef.current.value = ''

//     }

//     return (
//         <Form onSubmit={handleSearch} className='searchaddressform'>
//             <Form.Group controlId='address'>
//                 <Form.Label>Enter city</Form.Label>
//                 {/* Use Autocomplete from @react-google-maps/api to give user search suggestions */}
//                 <Autocomplete>
//                     <Form.Control type='text' ref={addressRef} required />
//                 </Autocomplete>
//             </Form.Group>
//             <Button className='btn-color' type='submit'>Search</Button>
//         </Form>
//     )

// }

// export default SearchForm