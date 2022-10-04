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
import AdminPage from './pages/AdminPage'
import RequireAuth from './components/RequireAuth'
import LoginPage from './pages/LoginPage'

function App() {
	const [theme, setTheme] = useState('light')
	const value = { theme, setTheme }

	return (
		<div id='App' bg={theme}>
			<ThemeContext.Provider value={value}>
				<Navigation />

				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='*' element={<NotFound />} />
					<Route path='/map' element={<MapPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/add' element={<AddFoodplacePage />} />
					<Route path='/foodplaces' element={<FoodplaceListPage />} />
					<Route
						path='/admin'
						element={
							<RequireAuth>
								<AdminPage />
							</RequireAuth>
						}
					/>
				</Routes>
			</ThemeContext.Provider>
		</div>
	)
}

export default App
