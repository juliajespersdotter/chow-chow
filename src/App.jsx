import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import AddRestaurantPage from './pages/AddRestaurantPage'
import RestaurantListPage from './pages/RestaurantListPage'
import ThemeContext from './contexts/ThemeContext'
import './assets/scss/App.scss'

function App() {
	const [theme, setTheme] = useState('light')
	const value = { theme, setTheme }

	return (
		<div id='App'>
			<ThemeContext.Provider value={value}>
				<Navigation />

				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='*' element={<NotFound />} />
					<Route path='/add' element={<AddRestaurantPage />} />
					<Route
						path='/foodplaces'
						element={<RestaurantListPage />}
					/>
				</Routes>
			</ThemeContext.Provider>
		</div>
	)
}

export default App
