import { useMemo } from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'
import { matchSorterFn } from '../utilities/sorting'
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const FoodplacesTable = ({ columns, data }) => {
	const defaultColumn = useMemo(
		() => ({
			Filter: '',
		}),
		[]
	)
	const filterTypes = useMemo(
		() => ({
			rankedMatchSorter: matchSorterFn,
		}),
		[]
	)

	const tableInstance = useTable(
		{
			columns,
			data,
			defaultColumn,
			filterTypes,
		},
		useFilters,
		useSortBy
	)
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance

	return (
		<>
			{data && (
				<MaUTable {...getTableProps()}>
					<TableHead>
						{headerGroups.map(headerGroup => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<TableCell
										{...column.getHeaderProps(
											column.getSortByToggleProps()
										)}
									>
										{column.render('Header')}
										{/* <div> */}
										{column.canFilter
											? column.render('Filter')
											: null}
										{/* </div> */}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row)
							return (
								<TableRow {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<TableCell {...cell.getCellProps()}>
												{cell.render('Cell')}
											</TableCell>
										)
									})}
								</TableRow>
							)
						})}
					</TableBody>
				</MaUTable>
			)}
		</>
	)
}

export default FoodplacesTable
