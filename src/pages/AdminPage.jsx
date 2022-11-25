import { useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import useFoodplaces from '../hooks/useFoodplaces'
import { DropdownFilter, TextSearchFilter } from '../utilities/filters'
import AdminTable from '../components/AdminTable'
import Alert from 'react-bootstrap/Alert'
import LoadingSpinner from '../components/LoadingSpinner'
import useGetUsers from '../hooks/useGetUsers'

const AdminPage = () => {
	const { foodplaces, isLoading } = useFoodplaces({
		fetchUnApproved: true,
	})
	const { users, loading } = useGetUsers()
	console.log("Users are:", users)

	const columns = useMemo(
		() => [
			{
				Header: 'Unapproved Foodplaces',
				columns: [
					{
						id: 'id',
						Header: 'Name',
						accessor: 'name',
						Filter: TextSearchFilter,
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
						accessor: data =>
							data.meals.map((item, i) => (
								<div key={i}>
									<span key={i} className='ms-2'>
										{item}
									</span>
								</div>
							)),
					},
				],
			},
		],
		[]
	)

	return (
		<>
			<Container className='foodplace-list'>
				{isLoading && <LoadingSpinner />}

				{foodplaces && foodplaces.length === 0 && (
					<Alert variant='warning' className='mt-5'>
						No foodplaces to approve...
					</Alert>
				)}

				{foodplaces && foodplaces.length !== 0 && (
					<div className='p-3'>
						{foodplaces && (
							<>
								<AdminTable columns={columns} data={foodplaces} />
							</>
						)}
					</div>
				)}
			</Container>

			<Container className="py-2">
				{loading && (
					<p>Loading admins...</p>
				)}

				{users && (
					<>
						<h3>Admins are: </h3>
						<ListGroup>
							{users.map(user => (
								<ListGroup.Item key={user.email}>{user.name}</ListGroup.Item>
							))}
						</ListGroup>
					</>
				)}
			</Container>
		</>
	)
}

export default AdminPage
