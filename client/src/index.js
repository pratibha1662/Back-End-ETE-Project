import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { ToastContainer } from 'react-toastify'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './style/globals.min.css'
import './style/reset.min.css'
import './style/themify-icons.css'
import './style/font-awesome.min.css'
import './style/animate.css'
import './style/responsive.css'
import './style/slicknav.min.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<ToastContainer />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
