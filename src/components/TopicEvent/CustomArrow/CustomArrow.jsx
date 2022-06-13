import React from 'react'
import './CustomArrow.scss'

const CustomPrevArrow = ({ className, style, onClick }) => {
	return (
		<div
			className={`customArr prevArr`}
			onClick={onClick}
		/>
	)
}

const CustomNextArrow = ({ className, style, onClick }) => {
	return (
		<div
			className={`customArr nextArr`}
			onClick={onClick}
		/>
	)
}

export { CustomNextArrow, CustomPrevArrow }
