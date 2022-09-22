import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import AddFoodplacePage from './pages/AddFoodplacePage'
import FoodplaceListPage from './pages/FoodplaceListPage'
import ThemeContext from './contexts/ThemeContext'
import MapPage from './pages/MapPage'
import './assets/scss/App.scss'

function App() {
	const [theme, setTheme] = useState('light')
	const value = { theme, setTheme }

	return (
		<div id='App' bg={theme}>
			<ThemeContext.Provider value={value}>
				<Navigation />

				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/map' element={<MapPage />} />
					<Route path='*' element={<NotFound />} />
					<Route path='/add' element={<AddFoodplacePage />} />
					<Route path='/foodplaces' element={<FoodplaceListPage />} />
				</Routes>
			</ThemeContext.Provider>
		</div>
	)
}

export default App
