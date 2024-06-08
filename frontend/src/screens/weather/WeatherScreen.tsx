import {
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import axios from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { FaWind } from 'react-icons/fa'
import '../../utils/background.css'

const WeatherScreen: React.FC = () => {
	const [city, setCity] = useState('')
	const [weather, setWeather] = useState<any>(null)
	const [forecast, setForecast] = useState<any[]>([])

	const fetchWeather = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/weather?city=${city}`
			)
			setWeather(response.data)
			const forecastResponse = await axios.get(
				`http://localhost:8000/api/forecast?city=${city}`
			)
			setForecast(forecastResponse.data.dailyForecasts)
		} catch (error) {
			console.error('Error fetching weather data:', error)
		}
	}

	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp)
		return date.toLocaleDateString()
	}

	return (
		<div className='background'>
			<div style={styles.container}>
				<div style={styles.searchContainer}>
					<TextField
						label='Enter city'
						variant='outlined'
						value={city}
						onChange={e => setCity(e.target.value)}
						style={styles.searchInput}
						InputProps={{ style: styles.inputProps }}
						InputLabelProps={{ style: styles.inputLabelProps }}
					/>
					<Button
						variant='contained'
						color='primary'
						onClick={fetchWeather}
						style={styles.searchButton}
					>
						Search
					</Button>
				</div>
				{weather && (
					<Card style={styles.card}>
						<CardContent>
							<Typography variant='h5'>{weather.city}</Typography>
							<Typography variant='h6'>{weather.temperature}°C</Typography>
							<Typography variant='body1'>
								<FaWind /> {weather.windSpeed} m/s
							</Typography>
							<Typography variant='body2'>{weather.description}</Typography>
						</CardContent>
					</Card>
				)}
				{forecast.length > 0 && (
					<div style={styles.forecastContainer}>
						<Typography variant='h6'>7-Day Forecast</Typography>
						<Grid container spacing={2} style={styles.forecastGrid}>
							{forecast.map((day, index) => (
								<Grid item xs={12} sm={4} key={index}>
									<Card style={styles.forecastCard}>
										<CardContent style={styles.forecastContent}>
											<Typography variant='body1'>
												{formatDate(day.date)}
											</Typography>
											<Typography variant='body2'>
												{day.temperature}°C
											</Typography>
											<Typography variant='body2'>
												<FaWind /> {day.windSpeed} m/s
											</Typography>
											<Typography variant='body2'>{day.description}</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</div>
				)}
			</div>
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column' as 'column',
		alignItems: 'center',
		padding: '20px',
		gap: '20px',
	},
	searchContainer: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		width: '100%',
		justifyContent: 'center',
	},
	searchInput: {
		width: '100%',
		maxWidth: '300px',
		backgroundColor: '#fff',
		borderRadius: '4px',
	},
	inputProps: {
		color: '#333',
		backgroundColor: '#fff',
	},
	inputLabelProps: {
		color: '#333',
	},
	searchButton: {
		fontSize: '16px',
		padding: '10px 20px',
	},
	card: {
		width: '100%',
		maxWidth: '300px',
		borderRadius: '20px',
		backgroundColor: '#f0f0f0',
	},
	forecastContainer: {
		width: '100%',
		maxWidth: '900px',
	},
	forecastGrid: {
		width: '100%',
	},
	forecastCard: {
		borderRadius: '20px',
		backgroundColor: '#f0f0f0',
	},
	forecastContent: {
		padding: '10px',
		textAlign: 'center' as 'center',
	},
}

export default WeatherScreen
