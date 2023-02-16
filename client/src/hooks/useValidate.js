import { useState } from 'react'
import validator from 'validator'

const useValidate = () => {

	const [errors, setErrors] = useState([])
	const [showErrors, setShowErrors] = useState(false)

	const validations = (form) => {
		setErrors([])
		required(form.email, 'email')
		email(form.email, 'email')
		lt(form.password, 'password', 6)
	}

	const required = (value, field) => {
		if (!value.toString().trim().length) {
			setErrors(prev => [...prev, `${field} es requerido`])
		}
	}

	const email = (value, field) => {
		if (!validator.isEmail(value)) {
			setErrors(prev => [...prev, `${field} es invalido`])
		}
	}

	const lt = (value, field, min) => {
		if (value.toString().trim().length < min) {
			setErrors(prev => [...prev, `El ${field} Debe tener al menos ${min} caracteres.`])
		}
	}

	return {
		validations,
		errors,
		showErrors,
		setShowErrors
	}

}

export default useValidate
