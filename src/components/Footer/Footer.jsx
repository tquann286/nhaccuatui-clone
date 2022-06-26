import React from 'react'
import './Footer.scss'

import {FaPhoneAlt} from 'react-icons/fa'
import {BsInstagram} from 'react-icons/bs'
import {AiOutlineFacebook, AiFillGithub} from 'react-icons/ai'

const Footer = () => {
	return (
		<div className='ft-container'>
			<div className='ft-main'>
				<div className='ft-owner'>
					Website cloned by: tquann286_
					<a href='tel:0935802747'>
						<div className='ft-tel'>
							<FaPhoneAlt />
							<p>(0935) 802 747</p>
						</div>
					</a>
				</div>
				<div className='ft-related-link'>
					<a href='https://www.facebook.com/trung.quann.2806/' target='_blank' rel='noopener' className='fb-icon'>
						<AiOutlineFacebook />
					</a>
					<a href='https://www.instagram.com/tquann286_/' target='_blank' rel='noopener' className='insta-icon'>
						<BsInstagram />
					</a>
					<a href='https://github.com/tquann286' target='_blank' rel='noopener' className='git-icon'>
						<AiFillGithub />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer
