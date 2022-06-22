import { replaceDashUrl } from 'share/utilities'
import removeVietnameseTones from 'share/removeVietnameseTones'

import { toast } from 'react-toastify'

export const animationConfig = {
	animationIn: 'fadeIn',
	animationOut: 'fadeOut',
	animationInDuration: 100,
	animationOutDuration: 100,
	style: { zIndex: 1 },
}

export const handleVideoLink = (keyId, title, artists) => {
	const artistLink = artists.reduce((acc, cur, i) => {
		if (!cur.shortLink) {
			return `${acc}`
		} 
		if (acc) {
			return `${acc}${i > 0 ? '-ft-' : ''}${cur.shortLink}`
		}
		return `${cur.shortLink}`
	}, '')
	const videoLink =
		`video/${replaceDashUrl(
			removeVietnameseTones(title)
		)}-${artistLink}`.toLocaleLowerCase() + `&k=${keyId}`


	return videoLink
}

export const notify = () =>
	toast('🦄 Đã sao chép link.', {
		position: 'bottom-left',
		autoClose: 3000,
	})

export const toastConfig = {
	position: 'bottom-left',
	autoClose: 3000,
	newestOnTop: true,
}
