import { Route, Routes } from 'react-router-dom'
import './App.css'
import About from './screens/about/AboutScreen'
import WeatherScreen from './screens/weather/WeatherScreen'

function App() {
	return (
		<Routes>
			<Route path='about' element={<About />} />
			<Route path='/' element={<WeatherScreen />} />
		</Routes>
	)
}

export default App
