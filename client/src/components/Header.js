import useHeaderScroll from '../hooks/useHeaderScroll'
import HeaderMiddleInner from './HeaderMiddleInner'
import HeaderInner from './HeaderInner'
import { useHistory } from 'react-router'


const Header = () => {

	const headerScroll = useHeaderScroll()
	const history = useHistory()

	return (

		<header className={`header shop ${headerScroll && history.location.pathname !== '/cart' ? 'sticky':''}`}>
			<HeaderMiddleInner/>
			<HeaderInner/>
		</header>
	)
}

export default Header
