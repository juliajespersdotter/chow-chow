import { useMemo } from 'react'
import { useTable, useSortBy, useFilters, useRowSelect } from 'react-table'
import { matchSorterFn } from '../utilities/sorting'
import { doc, writeBatch } from 'firebase/firestore'
import { db } from '../firebase'
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from './Checkbox'
import Button from 'react-bootstrap/Button'

const AdminTable = ({ columns, data }) => {
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

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		state: { selectedRowIds },
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			filterTypes,
		},
		useFilters,
		useSortBy,
		useRowSelect,
		hooks => {
			hooks.visibleColumns.push(columns => {
				return [
					// column for selection
					{
						id: 'selection',
						Header: ({ getToggleAllRowsSelectedProps }) => (
							<Checkbox {...getToggleAllRowsSelectedProps()} />
						),
						Cell: ({ row }) => (
							<Checkbox {...row.getToggleRowSelectedProps()} />
						),
					},
					...columns,
				]
			})
		}
	)

	const approveFoodplace = async foodplace => {
		console.log(selectedFlatRows)
		if (selectedFlatRows.length) {
			const foodIds = selectedFlatRows.map(selectedRow => {
				return selectedRow.original.id
			})
			console.log(foodIds)
			const batch = writeBatch(db)

			foodIds.forEach(id => {
				const foodref = doc(db, 'foodplaces', `${id}`)
				batch.update(foodref, {
					approved: true,
				})
			})

			await batch.commit()
		}
	}

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
			<div className='d-flex justify-content-center w-100'>
				<Button
					onClick={approveFoodplace}
					variant='dark'
					className='m-0 p-2 m-5 '
				>
					Approve
				</Button>
			</div>
		</>
	)
}

export default AdminTable
