import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import AddRestaurantPage from './pages/AddRestaurantPage'
import './assets/scss/App.scss'

function App() {
	return (
		<div id='App'>
			<Navigation />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/add' element={<AddRestaurantPage />} />
			</Routes>
		</div>
	)
}

export default App
