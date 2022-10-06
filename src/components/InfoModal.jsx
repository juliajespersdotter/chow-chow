import Offcanvas from 'react-bootstrap/Offcanvas'
import useDirections from '../hooks/useDirections'

const InfoModal = ({ data, show, onClick }) => {
	const { url } = useDirections()

	return (
		<Offcanvas show={show} onHide={onClick} className='text-light'>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title className='d-flex flex-column align-items-start'>
					<h2>{data.name}</h2>
					<div className='w-50 p-3'>
						<img
							src='/images/foodplace.png'
							className='img-fluid'
							alt='image for restaurant'
						/>
					</div>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className='d-flex flex-column'>
				<span className='text-muted fst-italic text-center'>
					{data.type}, {data.cuisine}
				</span>
				<h5 className='text-center'> {data.description} </h5>

				<div className='d-flex flex-column w-100 my-5'>
					<div className='d-flex justify-content-between px-4'>
						{data.url && (
							<span>
								<a
									href={data.url}
									className='grey-text'
									target='_blank'
								>
									Website
								</a>
							</span>
						)}
						{data.email && (
							<span>
								<address>
									<a
										href={'mailto:' + data.email}
										className='grey-text'
										target='_blank'
									>
										Send an email
									</a>
								</address>
							</span>
						)}
					</div>

					<div className='d-flex justify-content-between px-4'>
						{data.phone && (
							<span className='grey-text'>
								Phone: {data.phone}
							</span>
						)}
						{data.facebook && (
							<span>
								<a
									href={data.facebook}
									className='grey-text'
									target='_blank'
								>
									{' '}
									Facebook{' '}
								</a>
							</span>
						)}
					</div>
				</div>

				<a
					href={url(data.name)}
					className='grey-text text-center'
					target='_blank'
				>
					Show on Google Maps
				</a>
			</Offcanvas.Body>
		</Offcanvas>
	)
}

export default InfoModal
