import { useEffect, useState } from 'react'

const useHeaderScroll = () => {

	const [headerScroll,setHeaderScroll] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if(window.scrollY > 200)
				setHeaderScroll(true)
			else
				setHeaderScroll(false)
		}
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])


	return headerScroll
}

export default useHeaderScroll
