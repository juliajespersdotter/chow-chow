import { useRef } from 'react'
import { useState } from 'react'
import useGetCollection from '../hooks/useGetCollection'

const SearchForm = ({ onSubmit, filterFoodplaces }) => {
	const cityRef = useRef()

	const [searchInput, setSearchInput] = useState('')

	const { data: foodplaces } = useGetCollection('foodplaces')

	const filteredFoodplaces =
		searchInput === ''
			? foodplaces
			: foodplaces.filter(foodplace => {
					return (
						foodplace.city
							.toLowerCase()
							.includes(searchInput.toLowerCase()) ||
						foodplace.name
							.toLowerCase()
							.includes(searchInput.toLowerCase())
					)
			  })

	const handleSubmit = e => {
		e.preventDefault()

		if (cityRef.current.value) {
			onSubmit(cityRef.current.value)
		}
		if (!searchInput.length) {
			return
		}

		setSearchInput('')
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='search-box'>
				<div className='input-group'>
					<input
						className='search-input'
						type='text'
						placeholder={'   Search restaurant'}
						onChange={e => setSearchInput(e.target.value)}
						value={searchInput}
						ref={cityRef}
					/>
				</div>

				{searchInput.length > 0 && filteredFoodplaces.length > 0 && (
					<ul className='list-search py-2 px-2'>
						{filteredFoodplaces?.map(foodplace => (
							<li
								key={foodplace.id}
								className='list-search-item mb-2'
								// onClick={() =>
								// 	setSearchInput(`${foodplace.name}, ${foodplace.city}`)
								// }
							>
								{foodplace.name}, {foodplace.city}
							</li>
						))}
					</ul>
				)}
			</form>
		</>
	)
}

export default SearchForm
