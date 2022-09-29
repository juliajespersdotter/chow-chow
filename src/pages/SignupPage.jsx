import React, { useRef, useState } from 'react'
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Card,
	Alert,
	Image,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const SignupPage = () => {
	const emailRef = useRef()
	const displayNameRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [photo, setPhoto] = useState(false)
	const { signup } = useAuthContext()
	const navigate = useNavigate()

	const handleFileChange = e => {
		if (!e.target.files.length) {
			setPhoto(null)
			return
		}

		setPhoto(e.target.files[0])
		console.log('File changed!', e.target.files[0])
	}

	const handleSubmit = async e => {
		e.preventDefault()

		// make sure user has entered the same password in both input fields
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('The passwords does not match')
		}

		setError(null)

		// try to sign up the user with the specified credentials
		try {
			setLoading(true)

			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				displayNameRef.current.value,
				photo
			)

			navigate('/')
		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

	return (
		<Container className='py-3 center-y'>
			<Row>
				<Col
					xs={{ span: 6, offset: 3 }}
					md={{ span: 4, offset: 4 }}
					className='logo-wrapper'
				></Col>
			</Row>

			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className='mb-3'>Sign Up</Card.Title>

							{error && <Alert variant='danger'>{error}</Alert>}

							<Form onSubmit={handleSubmit}>
								<Form.Group id='displayName' className='mb-3'>
									<Form.Label>Username</Form.Label>
									<Form.Control
										type='text'
										ref={displayNameRef}
										required
									/>
								</Form.Group>

								<Form.Group id='email' className='mb-3'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='email'
										ref={emailRef}
										required
									/>
								</Form.Group>

								<Form.Group id='photo' className='mb-3'>
									<Form.Label>Photo</Form.Label>
									<Form.Control
										type='file'
										onChange={handleFileChange}
									/>
									<Form.Text>
										{photo
											? `${photo.name} (${Math.round(
													photo.size / 1024
											  )} kB)`
											: 'No photo selected'}
									</Form.Text>
								</Form.Group>

								<Form.Group id='password' className='mb-3'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										ref={passwordRef}
										required
									/>
								</Form.Group>

								<Form.Group
									id='password-confirm'
									className='mb-3'
								>
									<Form.Label>
										Password Confirmation
									</Form.Label>
									<Form.Control
										type='password'
										ref={passwordConfirmRef}
										required
									/>
								</Form.Group>

								<Button disabled={loading} type='submit'>
									Create Account
								</Button>
							</Form>
						</Card.Body>
					</Card>

					<div className='text-center mt-3'>
						Already have an account? <Link to='/login'>Log In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default SignupPage
