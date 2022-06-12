export const getPlaylistKey = (url) => {
	const startIndex = url.indexOf('va.') + 3
	const stopIndex = url.lastIndexOf('.html')

	if (startIndex && stopIndex) {
		return url.substring(startIndex, stopIndex)
	} else {
		return null
	}
}
