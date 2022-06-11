import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.scss'
import { Homepage } from 'pages'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
