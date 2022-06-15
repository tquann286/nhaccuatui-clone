import { PROXY } from 'share/constants'
import { createPlaylistUrl } from 'share/utilities'

export const handleCopyBtn = (event, title, keyId) => {
	event.stopPropagation()
	navigator.clipboard.writeText(`${PROXY}${createPlaylistUrl(title, keyId)}`)

	alert('Đã sao chép liên kiết: ' + title)
}
