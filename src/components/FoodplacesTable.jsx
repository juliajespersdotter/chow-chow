import { useState } from 'react'
import {
	useTable,
	useSortBy,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
} from 'react-table'

const FoodplacesTable = ({ columns, data }) => {
	const tableInstance = useTable({ columns, data }, useSortBy)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance

	const GlobalFilter = ({
		preGlobalFilteredRows,
		globalFilter,
		setGlobalFilter,
	}) => {
		const count = preGlobalFilteredRows.length
		const [value, setValue] = useState(globalFilter)
		const onChange = useAsyncDebounce(value => {
			setGlobalFilter(value || undefined)
		}, 200)
	}

	return (
		<>
			<span>
				Search:{' '}
				<input
					value={value || ''}
					onChange={e => {
						setValue(e.target.value)
						onChange(e.target.value)
					}}
					placeholder={`${count} records...`}
					style={{
						fontSize: '1.1rem',
						border: '0',
					}}
				/>
			</span>
			{data && (
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th
										{...column.getHeaderProps(
											column.getSortByToggleProps()
										)}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<td {...cell.getCellProps()}>
												{cell.render('Cell')}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</>
	)
}

export default FoodplacesTable
