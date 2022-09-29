import React from 'react'
import Container from 'react-bootstrap/Container'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import useFoodplaces from '../hooks/useFoodplaces'

const AdminPage = () => {
	const { foodplaces, isLoading } = useFoodplaces({
		fetchUnApproved: true,
	})
	console.log(foodplaces)

	const approveFoodplace = async foodplace => {
		const foodplaceRef = doc(db, 'foodplaces', foodplace.id)

		// Set the "capital" field of the city 'DC'
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

			{!isLoading && (
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
			)}
		</Container>
	)
}

export default AdminPage
