import { PROXY } from 'share/constants'
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

export const handleCopyLink = (e, keyId, title, artists) => {
	e.stopPropagation()
	const artistLink = artists.reduce((acc, cur, i, arr) => {
		if (acc) {
			return `${acc}${i > 0 ? '-ft-' : '-'}${cur.shortLink}`
		}
		return `${cur.shortLink}`
	}, '')
	const videoLink =
		`${PROXY}/video/${replaceDashUrl(
			removeVietnameseTones(title)
		)}-${artistLink}`.toLocaleLowerCase() + `&k=${keyId}`

	navigator.clipboard.writeText(videoLink)
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
