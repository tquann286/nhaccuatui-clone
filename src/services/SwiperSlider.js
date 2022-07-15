import { PROXY } from 'share/constants'
import { copyNotify, createPlaylistUrl } from 'share/utilities'

export const handleCopyBtn = (event, title, keyId, lang) => {
	event.stopPropagation()
	navigator.clipboard.writeText(`${PROXY}${createPlaylistUrl(title, keyId)}`)
	copyNotify(lang)
}
