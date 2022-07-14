import notfoundImg from 'images/not_found.png'
import './NotFound.scss'

import { useLang } from 'hooks'

const NotFound = () => {

	return (
		<div className="notfound-container">
			<img src={notfoundImg} alt="Page not found" />
			<p className="notfound-title">{useLang('Không có sẵn dữ liệu để hiển thị', 'No data available here')}</p>
		</div>
	)
}

export default NotFound