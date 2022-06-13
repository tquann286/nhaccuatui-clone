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
	const stopIndex = url.lastIndexOf('.html')

	if (startIndex && stopIndex) {
		return url.substring(startIndex, stopIndex)
	} else {
		return null
	}
}
