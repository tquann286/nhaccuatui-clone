import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.scss'
import { Homepage, NotFound } from 'pages'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
