import { useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import useFoodplaces from '../hooks/useFoodplaces'
import { DropdownFilter } from '../utilities/filters'
import FoodplacesTable from '../components/FoodplacesTable'
import AdminTable from '../components/AdminTable'

const AdminPage = () => {
	const { foodplaces, isLoading } = useFoodplaces({
		fetchUnApproved: true,
	})
	console.log(foodplaces)

	const columns = useMemo(
		() => [
			{
				Header: 'Unapproved Foodplaces',
				columns: [
					{
						id: 'id',
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

	const approveFoodplace = async foodplace => {
		const foodplaceRef = doc(db, 'foodplaces', foodplace.id)

		await updateDoc(foodplaceRef, {
			approved: true,
		})
		console.log(foodplace)
	}

	return (
		<Container>
			{isLoading && <p>Loading...</p>}

			{foodplaces && foodplaces.length === 0 && (
				<p>No foodplaces to approve...</p>
			)}

			<div className='p-3'>
				{foodplaces && (
					<>
						<AdminTable columns={columns} data={foodplaces} />
					</>
				)}
			</div>

			{/* {!isLoading && (
				<Row xs={1} sm={1} md={2} lg={8}>
					{foodplaces.map(foodplace => (
						<Col key={foodplace.id} className='d-flex mb-4'>
							<h3>{foodplace.name}</h3>
							<Button
								onClick={() => {
									approveFoodplace(foodplace)
								}}
							>
								Approve
							</Button>
						</Col>
					))}
				</Row>
			)} */}
		</Container>
	)
}

export default AdminPage
