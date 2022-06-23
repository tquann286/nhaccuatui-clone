import removeVietnameseTones from 'share/removeVietnameseTones'
import { toast } from 'react-toastify'

export const getNavigateUrl = (url) => {
	const startIndex = url.indexOf('nhaccuatui.com/') + 15

	if (startIndex !== 14) {
		return url.substring(startIndex)
	} else {
		return '/'
	}
}

export const getPlaylistKeyId = (url) => {
	const startIndex = url.indexOf('va.') + 3
	const keyIdLength = 12

	if (startIndex) {
		return url.substring(startIndex, keyIdLength)
	} else {
		return null
	}
}

export const replaceDashUrl = (url) => {
	return url.replaceAll(' ', '-')
}

export const createPlaylistUrl = (title, keyId) => {
	const playlistTitle = replaceDashUrl(title)

	return `/playlist/${playlistTitle}.va.${keyId}`
}

export const covertTimestamp = (time) => {
	const date = new Date(time)

	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const createSongUrl = (title, keyId) => {
	if (title && keyId) {
		return `bai-hat/${replaceDashUrl(removeVietnameseTones(title))}&k=${keyId}`
	} else {
		return '/'
	}
}

export const createArtistUrl = (name, shortLink, artistId) => {
	if (name && shortLink && artistId) {
		return `nghe-si/${shortLink}&k=${artistId}`
	} else {
		return `tim-kiem/q=${replaceDashUrl(name)}`
	}
}

export const createTopicUrl = (title, keyId) => {
	if (title && keyId) {
		return `chu-de/${replaceDashUrl(removeVietnameseTones(title))}&k=${keyId}`
	} else {
		return '/'
	}
}

export const createTop100Url = (title, keyId) => {
	if (title && keyId) {
		return `top-100/${replaceDashUrl(removeVietnameseTones(title))}&k=${keyId}`
	} else {
		return '/'
	}
}

export const copyNotify = () =>
	toast('🦄 Đã sao chép link.', {
		position: 'bottom-left',
		autoClose: 3000,
	})

export const toastConfig = {
	position: 'bottom-left',
	autoClose: 3000,
	newestOnTop: true,
}

export const animationConfig = {
	animationIn: 'fadeIn',
	animationOut: 'fadeOut',
	animationInDuration: 100,
	animationOutDuration: 100,
	style: { zIndex: 1 },
}