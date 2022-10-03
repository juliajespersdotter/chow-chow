import { useTable, useSortBy } from 'react-table'

const FoodplacesTable = ({ columns, data }) => {
	const tableInstance = useTable({ columns, data }, useSortBy)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance

	return (
		<>
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
