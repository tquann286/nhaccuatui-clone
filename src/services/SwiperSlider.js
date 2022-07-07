import { PROXY } from 'share/constants'
import { createPlaylistUrl } from 'share/utilities'

export const handleCopyBtn = (event, title, keyId, lang) => {
	event.stopPropagation()
	navigator.clipboard.writeText(`${PROXY}${createPlaylistUrl(title, keyId)}`)

	alert(lang === 'vi' ? 'Đã sao chép liên kiết: ' + title : 'Copied link: ' + title)
}
