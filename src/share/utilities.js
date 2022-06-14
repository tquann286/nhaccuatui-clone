export const getPlaylistUrl = (url) => {
	const startIndex = url.indexOf('/playlist/') + 10

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

export const createPlaylistUrl = (title, keyId) => {
	const playlistTitle = title.replace(' ', '-')

	return `/playlist/${playlistTitle}va.${keyId}`
}