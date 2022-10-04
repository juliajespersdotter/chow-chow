import { useRef } from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import useFoodplaces from '../hooks/useFoodplaces'

const SearchForm = ({ onSubmit }) => {
	const cityRef = useRef()
	const items = [
		{
			id: 0,
			name: 'China Box',
			city: 'Malmö'			
		},
		{
			id: 1,
			name: 'Värnhems Falafel',
			city: 'Malmö'			
		},
		{
			id: 2,
			name: 'Quê',
			city: 'Malmö'			
		},
		{
			id: 3,
			name: 'D&J sallad',
			city: 'Malmö'			
		},
	]

	const handleOnSearch = (string, results) => {
		// onSearch will have as the first callback parameter
		// the string searched and for the second the results.
		console.log(string, results)
	  }
	
	  const handleOnHover = (result) => {
		// the item hovered
		console.log(result)
	  }
	
	  const handleOnSelect = (item) => {
		// the item selected
		console.log(item)
	  }
	
	  const handleOnFocus = () => {
		console.log('Focused')
	  }
	
	  const formatResult = (item) => {
		return (
		  <>
			{/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
			<span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
		  </>
		)
	  }

	// const { data: foodplaces } = useFoodplaces("foodplace");

	// const filteredFoodplaces =
	// 	searchInput === ""
	// 		? foodplaces
	// 		: foodplaces.filter((foodplace) => {
	// 				return (
	// 					foodplace.city.toLowerCase() || foodplace.name.toLowerCase()
	// 				);
	// 		  });

	const handleSubmit = (e) => {
		e.preventDefault();

		if (cityRef.current.value) {
			onSubmit(cityRef.current.value)
		}
		
	};

	return (
		<>
			<div style={{ width: 400, height: 100 }}>
				<ReactSearchAutocomplete
					items={items}
					onSearch={handleOnSearch}
					onHover={handleOnHover}
					onSelect={handleOnSelect}
					onFocus={handleOnFocus}
					autoFocus
					formatResult={formatResult}
				/>
			</div>

			<Form className='p-1' onSubmit={handleSubmit}>
				<Form.Group controlId='city' className='mb-3'>
					<Form.Control ref={cityRef} type='text' placeholder="Search by city"/>
				</Form.Group>	
			</Form>
		</>
	)
}

export default SearchForm