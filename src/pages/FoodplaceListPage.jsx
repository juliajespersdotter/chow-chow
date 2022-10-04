import { useState, useMemo } from 'react'
import useFoodplaces from '../hooks/useFoodplaces'
import Container from 'react-bootstrap/Container'
import FoodplacesTable from '../components/FoodplacesTable'
import { DropdownFilter } from '../utilities/filters'

const FoodplaceListPage = () => {
	const { foodplaces, isLoading } = useFoodplaces()

	const columns = useMemo(
		() => [
			{
				Header: 'Foodplace List',
				columns: [
					{
						Header: 'Name',
						accessor: 'name',
					},
					{
						Header: 'Address',
						accessor: 'streetadress',
					},
					{
						Header: 'City',
						accessor: 'city',
						Filter: DropdownFilter,
					},
					{
						Header: 'Description',
						accessor: 'description',
					},
					{
						Header: 'Cuisine',
						accessor: 'cuisine',
						Filter: DropdownFilter,
					},
					{
						Header: 'Type',
						accessor: 'type',
						Filter: DropdownFilter,
					},
					{
						Header: 'Meals',
						accessor: 'meals',
						Filter: DropdownFilter,
					},
				],
			},
		],
		[]
	)

	return (
		<Container>
			<div className='p-3'>
				{isLoading && <p>Loading...</p>}
				{foodplaces && (
					<>
						<FoodplacesTable columns={columns} data={foodplaces} />
					</>
				)}
			</div>
		</Container>
	)
}

export default FoodplaceListPage
