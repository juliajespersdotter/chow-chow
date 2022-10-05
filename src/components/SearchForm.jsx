import { flexbox } from '@mui/system'
import { useRef } from 'react'
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
			<span style={{ display: 'block', textAlign: 'left' }}>{item.city}</span>
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
			<div style={{ 
				width: 400, 
				marginTop: 20,
				marginBottom: 20,
				}}>
				<ReactSearchAutocomplete className="searchbar"
					items={items}
					maxResults={4}
					fuseOptions={{ keys: ["city"] }}
					onSearch={handleOnSearch}
					onHover={handleOnHover}
					onSelect={handleOnSelect}
					onFocus={handleOnFocus}
					formatResult={formatResult}
					onSubmit={handleSubmit}
					ref={cityRef}
					styling={{ zIndex: 4 }}
					autoFocus
				/>
			</div>

			{/* <Form className='p-1' onSubmit={handleSubmit}>
				<Form.Group controlId='city' className='mb-3'>
					<Form.Control 
					items={items}
					onSearch={handleOnSearch}
					onHover={handleOnHover}
					onSelect={handleOnSelect}
					onFocus={handleOnFocus}
					autoFocus
					formatResult={formatResult}
					ref={cityRef} 
					type='text' 
					placeholder="Search by city"/>
				</Form.Group>	
			</Form> */}
		</>
	)
}

export default SearchForm