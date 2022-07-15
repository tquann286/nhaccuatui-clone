import notfoundImg from 'images/not_found.png'
import './NotFound.scss'

import { useLang } from 'hooks'
import { Title } from 'components'

const NotFound = () => {

	return (
		<div className="notfound-container">
			<Title title={useLang('Không có dữ liệu', 'No data available')} />
			<img src={notfoundImg} alt="Page not found" />
			<p className="notfound-title">{useLang('Không có sẵn dữ liệu để hiển thị', 'No data available here')}</p>
		</div>
	)
}

export default NotFound