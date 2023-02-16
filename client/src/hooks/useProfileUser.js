import { useRef, useState } from 'react'

const useProfileUser = (onChange) => {

	const [ tempImg, setTempImg ] = useState(null)
	const inputFile = useRef(null)

	const handleImage = (e) => {
		e.preventDefault()
		inputFile.current.click()
	}

	const handleImageForm = (file) => {
		if (file) {
			setTempImg(URL.createObjectURL(file))
			onChange(file, 'imgFile')
		}else{
			setTempImg(null)
			onChange(null, 'imgFile')
			onChange(null, 'imagen')
		}
	}

	return {
		handleImage,
		handleImageForm,
		inputFile,
		tempImg
	}
}

export default useProfileUser
