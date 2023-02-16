import { useState } from 'react'

export const useForm = ( initState ) => {

	const [state, setState] = useState( initState )
	const [sendState, setSendState] = useState(null)

	const onChange = ( value, field ) => {
		setState({
			...state,
			[field]: value,
		})
	}

	const setForm = (form) => {
		setState(form)
	}

	const onSubmit = async (e, route) => {
		e.preventDefault()

		setSendState(1)
		const res = await fetch(route, {
			method: 'POST',
			body: JSON.stringify(state),
			headers: {
				'content-type': 'application/json'
			}
		})

		await res.json()
		setSendState(2)
	}

	return {
		...state,
		form: state,
		setForm,
		onChange,
		onSubmit,
		sendState
	}

}
