import { useMemo } from 'react'

// text search input
export function TextSearchFilter({
	column: { filterValue, preFilteredRows, setFilter },
}) {
	return (
		<input
			className='d-block'
			value={filterValue || ''}
			onChange={e => {
				setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
			}}
			placeholder={`Search...`}
		/>
	)
}

export const DropdownFilter = ({
	column: { filterValue, setFilter, preFilteredRows, id },
}) => {
	const options = useMemo(() => {
		const options = new Set()
		preFilteredRows.forEach(row => {
			options.add(row.values[id])
		})
		return [...options.values()]
	}, [id, preFilteredRows])

	return (
		<select
			className='d-block'
			value={filterValue}
			onChange={e => {
				setFilter(e.target.value || undefined)
			}}
		>
			<option value=''>All</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</select>
	)
}
