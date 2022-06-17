export const getNavigateUrl = (url) => {
	const startIndex = url.indexOf('nhaccuatui.com/') + 15

	if (startIndex) {
		return url.substring(startIndex)
	} else {
		return null
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