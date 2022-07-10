import { env } from 'config/environment'

// Link
export const PROXY = env.DOMAIN_URL
export const FB_LINK = 'https://www.facebook.com/trung.quann.2806'
export const INSTA_LINK = 'https://www.instagram.com/tquann286_'
export const GIT_LINK = 'https://github.com/tquann286'

export const TERM_LINK = 'https://www.nhaccuatui.com/thoa-thuan-su-dung'
export const DEFAULT_IMAGE = 'https://stc-id.nixcdn.com/v12/static/media/default_avatar.fb823ac2.png'

// Theme
export const CHANGE_LIGHT_THEME = 'change_light_theme'
export const CHANGE_DARK_THEME = 'change_dark_theme'
export const SET_THEME = 'set_theme'

// Language
export const CHANGE_VI_LANG = 'change_vi_lang'
export const CHANGE_EN_LANG = 'change_en_lang'
export const SET_LANG = 'set_lang'

// Authencation Form
export const TOGGLE_SHOW_LOGIN = 'toggle_show_login'
export const TOGGLE_SHOW_SIGN_UP = 'toggle_show_sign_up'

// Regex
export const REGEX_VIETNAMESE = /^(?!.*[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]).*$/
export const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/