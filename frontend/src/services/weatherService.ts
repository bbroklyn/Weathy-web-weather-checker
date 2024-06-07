import axios from 'axios'
import config from '../config/app.config'

const API_BASE_URL = `${config.apiBaseUrl}/weather`

export const getWeather = async () => {
	try {
		const response = await axios.get(API_BASE_URL)
		return response.data
	} catch (error) {
		console.error('Error fetching weather data:', error)
		throw error
	}
}
