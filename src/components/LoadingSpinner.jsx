import BounceLoader from 'react-spinners/BounceLoader'

const LoadingSpinner = () => {
	return (
		<div className='d-flex justify-content-center align-items-center w-100'>
			<BounceLoader color='#f86e51' size={50} />
		</div>
	)
}

export default LoadingSpinner
