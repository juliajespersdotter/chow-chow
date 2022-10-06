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

	const visibleRows = rows.slice(0, 10)

	return (
		<>
			{data && (
				<>
					<MaUTable {...getTableProps()}>
						<TableHead>
							{headerGroups.map(headerGroup => (
								<TableRow
									{...headerGroup.getHeaderGroupProps()}
								>
									{headerGroup.headers.map(column => (
										<TableCell
											{...column.getHeaderProps(
												column.getSortByToggleProps()
											)}
										>
											{column.render('Header')}
											{column.canFilter
												? column.render('Filter')
												: null}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableHead>
						<TableBody {...getTableBodyProps()}>
							{visibleRows.map((row, i) => {
								prepareRow(row)
								return (
									<TableRow {...row.getRowProps()}>
										{row.cells.map(cell => {
											return (
												<TableCell
													{...cell.getCellProps()}
												>
													{cell.render('Cell')}
												</TableCell>
											)
										})}
									</TableRow>
								)
							})}
						</TableBody>
					</MaUTable>
					<div className='w-100 text-muted mt-5'>
						Showing {visibleRows.length} of total {data.length}{' '}
						foodplaces
					</div>
				</>
			)}
		</>
	)
}

export default FoodplacesTable
