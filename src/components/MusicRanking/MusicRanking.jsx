import MusicCard from './MusicCard'
import './MusicRanking.scss'
import { Link } from 'react-router-dom'

import { useStore } from 'store'
import { createTop20Url } from 'share/utilities'

const MusicRanking = ({ ranking }) => {
  const [state] = useStore()
  const { lang } = state

	return (
		<div className='mr-container'>
			<div className='mr-title'>
        <Link to={createTop20Url('nhac-viet')}>{lang === 'vi' ? 'BXH bài hát' : 'NCT Song Chart'}</Link>
      </div>
      <div className="mr-main">
        {ranking.map((rankItem) => rankItem && (
          <MusicCard { ... rankItem } keyId={rankItem.key} lang={lang} />
        ))}
      </div>
		</div>
	)
}

export default MusicRanking
