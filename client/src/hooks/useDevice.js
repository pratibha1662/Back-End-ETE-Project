import { useEffect, useState } from 'react'

const useDevice = () => {

	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		setIsMobile(window.outerWidth < 991 ? true : false)
		window.addEventListener('resize', resize)
		return () => removeEventListener('resize', resize)
	}, [])

	const resize = ({ target }) => {
		if(target.innerWidth < 991)
			setIsMobile(true)
		else
			setIsMobile(false)
	}

	return isMobile
}

export default useDevice
