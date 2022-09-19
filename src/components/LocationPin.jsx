import React from 'react'
import { Icon } from '@iconify/react'
// import locationIcon from "@iconify/icons-mdi/map-marker";

const LocationPin = ({ text }) => (
	<div className='pin'>
		<div className='pin-icon' />
		<p className='pin-text'>{text}</p>
	</div>
)

export default LocationPin
